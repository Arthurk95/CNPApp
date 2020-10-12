function plain_text_to_db(note_contents) {
  console.log("TO DATABASE:")
  console.log(note_contents)
  current_note_as_utf_8_JSON = Buffer.from(note_contents, 'utf-8')
  myString = JSON.stringify(current_note_as_utf_8_JSON).replace(/\"/g, "*")
  return myString
}
  
function plain_text_from_db(note_contents_from_db) {
  console.log("FROM DATABASE:")
  note_contents_from_db = note_contents_from_db.replace(/\*/g, '"')
  const result_as_buffer = JSON.parse(note_contents_from_db, (key, value) => {
    return value && value.type === 'Buffer' ? Buffer.from(value) : value
  })
  return result_as_buffer.toString('utf-8')
}

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

module.exports = {
  plain_text_to_db,
  plain_text_from_db,
  fixedEncodeURIComponent
}