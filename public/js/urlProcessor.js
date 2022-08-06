/** 
* Recusively travels through the links in a given wikipedia page trying to find a given
* target article, making at most a given number of stops.
* 
* @author Jonas Costa
* 
*/

const { Queue } = require('./queue');
const wiki = require('wikijs').default;

// Stores whether or not the target value was found
var found = false;

/**
 * Given the url of the initial and final article and the number of stops in between, 
 * check if it is possible to go travel between them with without making more stops 
 * @param {String} urlStart Article that starts the search
 * @param {String} urlEnd Target article that we are trying to find
 * @param {Number} stops Maximum number of stops 
 * @returns {String} based on whether urlEnd was found
 */
async function run(urlStart, urlEnd, stops){

    // Checks if the urls are valid wikipedia links
    var start = processURL(urlStart)
    var end = processURL(urlEnd)

    // If not, returns
    if(start === "No URL" || end === "No URL" ){
        return "Enter Valid URL!"
    }

    // Stores all the already visited pages
    var visited = new Set();
    found = false;
    const queue = new Queue;

    // Adds initial article to the queue and null to keep track of the number of stops
    queue.enqueue(start)
    queue.enqueue(null);
    var final = await getLinksrecursive(end, visited, stops, 0, queue)

    if(final){
        return "SUCCES"
    }

    else{
        return "OHHH NO"
    }
    
}



/**
 * Recursively tries to find the target article by visiting all the links in the in the current page 
 * without surpassing the maximum number of stops (max_depth)
 * 
 * @param {String} comparer Target article we are trying to find
 * @param {Set} visited Already visited pages 
 * @param {Number} max_depth Maximum depth we are allowed to reach
 * @param {Number} depth Current Depth
 * @param {Queue} queue Articles waiting to be searched
 * @returns {boolean} If article was found or not.
 */
async function getLinksrecursive(comparer, visited, max_depth, depth, queue){
    
    if(found === true){
        return true
    }

    // If we haven't reached the max depth and haven't found the value, perform breadth first search 
    // on the articles linked in each page
    else if(depth <= max_depth && found === false){
        
        try{
            var curr = queue.dequeue();
            
            if(curr == null){
                depth++;
                queue.enqueue(null);
            }

            else{
                //Use wiki module to find the links in a Wikipedia page
                const results = await Promise.resolve(wiki().page(curr).then(page => page.links()))
                for(const result of results){
                    if(visited.has(result) === false){
                        visited.add(result)
                        if(result === comparer){
                            found = true;
                            return found;
                        }
    
                        else{
                            queue.enqueue(result)
                           
                        }
    
                        
                    }
                }
            }

            

            return getLinksrecursive(comparer, visited, max_depth, depth, queue);
            
        }
        
        catch(err){
           
        }
        
    }

    else{
        return false
    }
    

}

/**
 * Process a @param {*} url to a format without special characters 
 * @returns URI decoded String with proper format if that can be done. 
 * Otherwise, @returns "No URL"
 */
function processURL(url){
    if(url.startsWith("https://en.wikipedia.org/wiki/")){
        const pattern = url.match(/wiki\/(.*)/)[1];
        return decodeURIComponent(pattern.replace(/_/g, ' '))
    }

    return "No URL"
}

module.exports = {run, processURL}