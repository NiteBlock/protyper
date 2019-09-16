module.exports.get_input = req => {
    if(req.method == "GET"){
        return req.query
    } else if(req.query && req.query != {}){
        return req.query
    } else if (req.body && req.body != {}){
        return req.body
    }
    return {}
}


module.exports.format = req => {
    let p = module.exports.get_input(req)
    if(!p.redict){
        return "/"
    }
    return p.redict
}
