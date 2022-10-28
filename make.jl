push!(LOAD_PATH,"../src/")


using Documenter
using DjembeRhythms

pages = [
  "Home" => "index.md" ,
  "Abandon" => "abandon.md",
  "Kuku" => "kuku.md"
]
  
# filter!(x -> x!="index.md" &&  endswith(x,"*.md"), readdir("src/")) 

format = Documenter.HTML(prettyurls = get(ENV, "CI", nothing) == "true") 

makedocs(
    sitename = "Djembe Rhythms",
    format = format,
    # linkcheck=true,
    pages = pages
)

deploydocs(
    repo = "github.com/roelstappers/DjembeRhythms.jl",
    push_preview=true
)
