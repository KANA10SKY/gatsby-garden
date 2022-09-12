---
title: TEST-NOTE
tags:
- YAML
- TEST
---
## Generic Test
### Attachment Test (Image files)
- Obsidian Drag&Drop Style 1
  ![[Publish/gatsby-garden/_notes/images/Lenna_(test_image).png]
- Obsidian Drag&Drop Style 2
  ![[Publish/gatsby-garden/_notes/images/Lenna_(test_image).png]] 
- Standard Style
  ![Valid_ImageLink](images/Lenna_(test_image).png) 
  ![Valid_ImageLink](images/mental_programming.jpg) 
  
<!-- ![Image](mental_programming.jpg) -->

### URL Link Test
  [Invalid Link](./Markdown.md "title")  
  [Invalid Link](./Zettelkasten.md) need line break spell ?
  [Invalid Link](./Zettelkasten)
  [Invalid Link : Zettelkasten](Zettelkasten)
  [Invalid Link : ./zettelkasten.md](./zettelkasten.md)
  [Valid Link : ./zettelkasten](./zettelkasten)
  [Valid Link : zettelkasten](zettelkasten)
  [Valid Link : markdown](markdown)
  [[Zettelkasten]]
  [[Markdown]]
  test string
  yeah


### Youtube Embed Test
<iframe width="640" height="360" src="https://www.youtube.com/embed/PotroTeL1lE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Mermaid Test
```mermaid
flowchart LR
    A{UE\nSequencer}
    A -->|Art-Net|A 
    A -->|Art-Net|B[Real Stage]
```

```mermaid
flowchart LR
DAW -- 128 MIDI NOTE/CC x4tracks --> mport[virtual midi port]
-->m2a[MIDI2ArtNet] -- 1universe 512channels Art-Net -->StageFixtures
```

## obsidian-vimrc-support TEST
[[wiki]]

[test]()
[test](https://github.com/esm7/obsidian-vimrc-support)
