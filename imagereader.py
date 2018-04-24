from PIL import Image

def main(path):
    myImage = Image.open(path)
    dimensions = myImage.size

    pixelColors = list(myImage.getdata())
    
    file = open("pixels.txt", "w+")
    file.write(str(myImage.size[0]))
    file.write("\n")
    file.write(str(myImage.size[1]))
    file.write("\n")
    
    for i in range(myImage.size[0] * myImage.size[1]):
        pixelString = str(pixelColors[i])
        pixelString = pixelString[1:-1]
        pixelString = str.replace(pixelString," ", "") 
        file.write(pixelString + ";")

main('test.jpg')
