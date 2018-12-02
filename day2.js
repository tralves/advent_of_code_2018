var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day2-input'),
})

const ids = []
let twoLetterCount = 0
let threeLetterCount = 0

lineReader.on('line', function(line) {
  // console.log('Line from file:', line)
  ids.push(line)
  const lineCounts = getCounts(line)
  twoLetterCount += lineCounts.hasTwoLetter ? 1 : 0
  threeLetterCount += lineCounts.hasThreeLetter ? 1 : 0
})

lineReader.on('close', function() {
  console.log('closed ' + ids.length)
  console.log(twoLetterCount + ' ' + threeLetterCount)
  console.log('part 1: ' + twoLetterCount * threeLetterCount)

  getSimilarIDs(ids)
})

function getCounts(line) {
  const counts = {}
  for (var i = 0; i < line.length; i++) {
    counts[line[i]] ? counts[line[i]]++ : (counts[line[i]] = 1)
  }

  const ret = { hasTwoLetter: false, hasThreeLetter: false }
  Object.keys(counts).forEach(l => {
    if (counts[l] === 2) ret.hasTwoLetter = true
    if (counts[l] === 3) ret.hasThreeLetter = true
  })

  return ret
}

function getSimilarIDs(ids) {
  ids.forEach(id1 => {
    ids.forEach(id2 => {
      if ((s = isSimilarID(id1, id2))) {
        console.log('part 2: ' + s)
        return
      }
    })
  })
}

function isSimilarID(id1, id2) {
  let diffs = 0
  let same = ''
  for (var i = 0; i < id1.length; i++) {
    if (id1[i] !== id2[i]) {
      diffs++
    } else {
      same += id1[i]
    }
    if (diffs > 1) return false
  }
  return diffs == 1 ? same : false
}
