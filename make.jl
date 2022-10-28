push!(LOAD_PATH,"../src/")


using Documenter

pages = [
  "Home" => "index.md" ,
  "Abandon" => "abandon.md",
  "Kuku" => "kuku.md"
]
  

format = Documenter.HTML(
    prettyurls = get(ENV, "CI", nothing) == "true"
#    assets = [
#       asset("https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js")
#    ]
) 

makedocs(
    sitename = "Djembe Rhythms",
    format = format,
    # linkcheck=true,
    pages = pages
)

# Insert tone.js cdn
htmlfiles = filter(x -> endswith(x,".html"),readdir("build"))
tonetag="""<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js" 
        integrity="sha512-Siyxh4gyNM5SaERNa9BOZSPcu/auHyFUWn9OVFD7MxI3/dVPQklE7tfqS+pLmPHF1zo6UdDaJAp/thihrf0c7w==" 
         crossorigin="anonymous" referrerpolicy="no-referrer"></script>"""

for file in htmlfiles
    str = read("build/$file",String)
    str = replace(str,"<head>" => "<head> $tonetag")
    write("build/$file",str)
end



deploydocs(
    repo = "github.com/roelstappers/DjembeRhythms",
    push_preview=true
)
