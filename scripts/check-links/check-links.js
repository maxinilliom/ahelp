// install dependencies
// npm i got tough-cookie
const got = require('got')
const {CookieJar} = require('tough-cookie');

// some sites, such as invalid Wikia sub-domains (runescapeeeeeee.wikia.com), will redirect to a valid non-error page and thus won't be picked up
const urlPattern = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$!])/igm

exports.run = (client, message, args, level) => {
  /* @TODO Can be implemented with calls to checkUrlsInFile() below */
  throw 'Unimplemented'
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  guilds: []
}

exports.help = {
  name: "test",
  category: "System",
  description: "This is a test command.",
  usage: "test"
}

// scrape URLs from strings within object structure
function collectUrls(obj) {
  let urls = []

  function processLeaf( val, path ) {
    val.replace(urlPattern, u => urls.push({url: u, path }) )
  }
  
  function recurse(o, pre) {
    pre = pre || []
    if ( typeof o == 'object' || Array.isArray( o ) ) {
      for (var i in o) {
        recurse( o[i], pre.concat([i]) )
      }
    } else {
      processLeaf(o, pre)
    }
  }
  
  recurse(obj)
  return urls
}

// check the URLs
async function checkUrlsInFile(filename, onError) {
  filename = require('path').resolve(filename)
  const urls = collectUrls(
    require(filename)
  )
  for ( var {url, path} of urls ) {
    try {
      // remember cookies across redirects with a cookie jar
	  // some sites, such as https://discord.me/alright, will infinitely redirect if cookies are not enabled
      cookieJar = new CookieJar()
      // throws an exception if it can't reach the server
      const { statusCode, statusMessage, redirectUrls } = await got(url, {cookieJar} )
      // throw exception if not a 200 OK
      if (statusCode != 200) {
        throw { name: "Status " + statusCode, message: statusMessage }
      }
      // may want ot uncomment to warn about redirects
      //if (redirectUrls.length !== 0) {
      //  throw { name: "redirects", message: redirectUrls }
      //}
      // Otherwise, OK!
      //onError({OK:url})
    } catch( { name, message } ) {
      onError({filename,path,url,error: { name, message } })
    }
  }
}

// Usage: `node check-links FILE...`
// If this is require()'d as a module from another script, the block below does NOT execute.
if (require.main === module) {
  const files = process.argv.slice(2);
  (async () => {
    for (var f of files) {
      await checkUrlsInFile(f, console.log)
    }
  })().catch(console.error)
}
