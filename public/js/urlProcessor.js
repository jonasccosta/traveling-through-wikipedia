const { Queue } = require('./queue');
const wiki = require('wikijs').default;


var found = false;

async function run(urlStart, urlEnd, stops){

    var start = proccessUrl(urlStart)
    var end = proccessUrl(urlEnd)


    if(start === "No URL" || end === "No URL" ){
        return "Enter Valid URL!"
    }

    var visited = new Set();
    found = false;
    const queue = new Queue;
    queue.enqueue(start)
    queue.enqueue(null);
    var final = await getLinksrecursive(end, visited, stops, 0, queue)

    if(final){
        return "SUCCES"
    }

    else{
        console.log(final)
        return "OHHH NO"
    }
}


async function getLinksrecursive(comparer, visited, max_depth, depth, queue){
   
    
    if(found === true){
        return true
    }

    else if(depth <= max_depth && found === false){
        
        try{
            var curr = queue.dequeue();
            
            if(curr == null){
                depth++;
                queue.enqueue(null);
            }

            else{
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


function proccessUrl(url){
    if(url.startsWith("https://en.wikipedia.org/wiki/")){
        const pattern = url.match(/wiki\/(.*)/)[1];
        return decodeURIComponent(pattern.replace(/_/g, ' '))
    }

    return "No URL"
}

module.exports = {run, proccessUrl}