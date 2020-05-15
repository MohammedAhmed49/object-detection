const mongoose = require('mongoose');
const schema = mongoose.Schema;

const resultSchema = new schema({
    FrameNum:[Number],
    Objects:[[String]],

  });

  const result = mongoose.model('Result',resultSchema);
  module.exports = result;