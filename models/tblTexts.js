'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var Respond_1 = require('./Respond')
var TblTexts = /** @class */ (function() {
  function TblTexts(id, text, textId, categoryId, date) {
    this.id = null
    this.categoryId = null
    this.date = ''
    this.text = ''
    this.textId = null
    id = id
    text = text
    textId = textId
    categoryId = categoryId
    date = date
  }
  TblTexts.prototype.fromRespond = function(respond) {
    if (!respond || respond.status !== Respond_1.stCodes.success) {
      return
    }
    var data = respond.data[0]
    if (data !== undefined) {
      this.id = data.id
      this.textId = data.textId
      this.text = data.text
      this.categoryId = data.categoryId
      this.date = data.date
    }
  }
  return TblTexts
})()
exports.default = TblTexts
