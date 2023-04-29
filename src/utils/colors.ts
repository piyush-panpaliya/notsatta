const data = [
  { color: "#004B8D", id: 593 },
  { color: "#E63329", id: 646 },
  { color: "#3A225D", id: 591 },
  { color: "#F9CD05", id: 610 },
  { color: "#282968", id: 612 },
  { color: "#C3A11F", id: 629 },
  { color: "#EE7429", id: 658 },
  { color: "#DD1F2D", id: 627 },
  { color: "#0057E2", id: 123214 },
  { color: "#1B2133", id: 123216 },
]

export default data

export const getColor = (id: number) => data.find((item) => item.id === id)?.color