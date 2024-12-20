import './style.css'
import { Boundary, Point, QuadTree } from "./js/Quadtree";

let canvas = document.getElementById("canvas")
export let c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let points = []

let boundary = new Boundary(innerWidth/2, innerHeight/2, innerWidth, innerHeight)
let qt = new QuadTree(boundary, 4)
for (let i = 1; i < innerWidth; i += 5) {
  let p = new Point(i*Math.random(), i*Math.random() , c)
  qt.insert(p)

  points.push(p)
}


console.log(qt)
// console.log(qt.find(new Point(4, 4)))

points.map(e => {
  e.draw()
})

const animate = () => {
  requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0,0,canvas.width, canvas.height)

  
points.map(e => {
  e.update()
})

qt.display()

}

animate()