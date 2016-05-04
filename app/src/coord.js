/********************************************************************************/
//the class for changing between Cartesian(dbl for double) and computer(int) coordinate system
/********************************************************************************/
function Coord(intWidth, intHeight, dblXmin, dblXmax, dblYmin, dblYmax) {
  this.intWidth = intWidth;
  this.intHeight = intHeight;
  this.dblXmin = dblXmin;
  this.dblXmax = dblXmax;
  this.dblYmin = dblYmin;
  this.dblYmax = dblYmax;
}

Coord.prototype = {
  getDblX: function(intX) {
    return this.dblXmin+intX*(this.dblXmax-this.dblXmin)/this.intWidth;
  },
  getDblY: function(intY) {
    return this.dblYmax-intY*(this.dblYmax-this.dblYmin)/this.intHeight;
  },
  getIntX: function(dblX) {
    var i = Math.round((dblX-this.dblXmin)*this.intWidth/(this.dblXmax-this.dblXmin));
    if (i<0)  {
      return 0;
    } else if (i>this.intWidth)  {
      return i-1;
    } else {
      return i;
    }
  },
  getIntY: function(dblY) {
    var i = Math.round((this.dblYmax-dblY)*this.intHeight/(this.dblYmax-this.dblYmin));
    if (i<0)  {
      return 0;
    } else if (i>this.intHeight)  {
      return i-1;
    } else {
      return i;
    }
  }
};

module.exports = Coord;
