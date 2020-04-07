const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories)

}); //Done

app.post("/repositories", (request, response) => {
  const { id, title, url, techs, likes } = request.body

  const repository = {id: uuid(), title, url, techs, likes: 0}

  repositories.push(repository)

  return response.json(repository)
}); //Done

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const {url, title, techs} = request.body

  const repositoryIndex = repositories.findIndex(repositorys => repositorys.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repo Not Found"})
  }

  const repository = {
    id,
    url,  
    title,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)

}); //Done

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repositorys => repositorys.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repo Not Found"})
  }

    repositories.splice(repositoryIndex, 1)
    return response.status(204).send()

}); //Done

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.find(r => r.id === id)
   if (!repositoryIndex){
    return response.status(400).json({error: "Repo Not Found"})
  }
  repositoryIndex.likes += 1 

  return response.status(202).json(repositoryIndex)
})

module.exports = app;
