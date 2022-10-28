push!(LOAD_PATH,"../src/")


using Documenter

pages = [
  "Home" => "index.md" ,
  "Abandon" => "abandon.md",
  "Kuku" => "kuku.md"
]
  

format = Documenter.HTML(
    prettyurls = get(ENV, "CI", nothing) == "true"
    assets = [
       asset("https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js")
    ]
) 

makedocs(
    sitename = "Djembe Rhythms",
    format = format,
    # linkcheck=true,
    pages = pages
)

deploydocs(
    repo = "github.com/roelstappers/DjembeRhythms",
    push_preview=true
)
