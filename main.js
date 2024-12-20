class Point {
  constructor(x,y){
    this.x = x
    this.y = y
  }
}

class Boundary {
constructor(x,y,w,h){
  this.x = x
  this.y = y
  this.w = w
  this.h = h
}
contains(point){
  return (point.x > this.x - this.w &&
      point.x < this.x + this.w &&
      point.y > this.y - this.h &&
      point.y <this.y + this.h
  )
}
}

class QuadTree{
  constructor(boundary, c){
    this.x = boundary.x
    this.y = boundary.y
    this.h = boundary.h
    this.w = boundary.w
    this.boundary = boundary
    this.points =[]
    this.divided = false
    this.capacity = c
  }
  subdivide(){
    this.divided = true
    let nw = new Boundary(this.x + this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2)
    this.northwest = new QuadTree(nw,4)
    let ne = new Boundary(this.x - this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2)

    this.northeast = new QuadTree(ne,4)
    let sw = new Boundary(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2)

    this.southwest = new QuadTree(sw,4)
    let se = new Boundary(this.x - this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2)

    this.southeast = new QuadTree(se,4)
  }
  find(p){
  //  if(this.boundary.contains(p)){
    
  //   this.northwest.find(p)
  //   this.northeast.find(p)
  //   this.southwest.find(p)
  //   this.southeast.find(p)
  //     console.log(this.points)
  //  }else{

  //  }

//   if(this.points.filter(e => e.x == p.x && e.y == p.y).length == 0){ return ''}
//  else{

  
//     //  return this.points
//     console.log(this.points)
//   }


if(this.points.filter(e => e.x == p.x && e.y == p.y).length == 0){
   if(this.divided){
    this.northwest.find(p)
    this.northeast.find(p)
    this.southwest.find(p)
    this.southeast.find(p)
   }
   
 }else{
  console.log(this.points)
 }
  }
  insert(p){

    if(!this.boundary.contains(p)){
      return
    }
   

    if(this.points.length > this.capacity){
      if(!this.divided){
      this.subdivide()
      }
      this.northwest.insert(p)
      this.northeast.insert(p)
      this.southwest.insert(p)
      this.southeast.insert(p)
    }else{
      this.points.push(p)
    }
   
  }
}

let boundary = new Boundary(200,200,200,200)
let qt = new QuadTree(boundary,4)
for(let i=1; i<10; i++){
  let p = new Point(i, i)
  qt.insert(p)
}

console.log(qt)
qt.find(new Point(4 ,4))