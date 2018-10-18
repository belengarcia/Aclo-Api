FuckOff.aggregate([{
  $group: {
      _id: '$from',
      count: {$sum: 1}
  }
}]).then((result) => res.json(result))

FuckOff.aggregate([
  { $match: {'from': 'tu from'}},
  { $group: {'_id': {
                  'year': { '$year': "$createdAt" },
                  'month': { '$month': "$createdAt" },
                  'day': { '$dayOfMonth': "$createdAt" }}}}
]).then((result) => res.json(result))