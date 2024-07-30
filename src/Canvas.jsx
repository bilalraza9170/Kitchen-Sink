import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric"; // Correct import for fabric

const Canvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [color, setColor] = useState(""); // New state for color

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current);
    setCanvas(canvasInstance);

    canvasInstance.on("selection:created", (event) => {
      setSelectedObject(event.selected[0]);
      setColor(event.selected[0].fill); // Set initial color
    });

    canvasInstance.on("selection:updated", (event) => {
      setSelectedObject(event.selected[0]);
      setColor(event.selected[0].fill); // Set initial color
    });

    canvasInstance.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    return () => {
      canvasInstance.dispose(); // Cleanup on unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const addRectangle = () => {
    if (!canvas) return; // Ensure canvas is initialized
    const rect = new fabric.Rect({
      top: 50,
      left: 50,
      width: 200,
      height: 100,
      fill: "red",
    });
    canvas.add(rect);
    canvas.renderAll(); // Render the canvas after adding the rectangle
  };

  const addCircle = () => {
    if (!canvas) return; // Ensure canvas is initialized
    const circle = new fabric.Circle({
      radius: 50,
      fill: "black",
      left: 200,
      top: 180,
    });
    canvas.add(circle);
    canvas.renderAll(); // Render the canvas after adding the circle
  };

  const addTextBox = () => {
    if (!canvas) return; // Ensure canvas is initialized
    const text = new fabric.Textbox("Hello World", {
      left: 50,
      top: 180,
      fill: "blue",
    });
    canvas.add(text);
    canvas.renderAll(); // Render the canvas after adding the text
  };

  // const addImage = () => {
  //   if (!canvas) return; // Ensure canvas is initialized
  //   fabric.FabricImage.fromURL(
  //     "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  //     (img) => {
  //       img.set({
  //         left: 50,
  //         top: 300,
  //       });
  //       canvas.add(img);
  //       canvas.renderAll(); // Render the canvas after adding the image
  //     }
  //   );
  // };

  const addImage = () => {
    if (!canvas) return; // Ensure canvas is initialized
    const imgElement = new Image();
    imgElement.src =
      "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/f3eecd58-cb2b-44ff-8947-9ba3f11ac923/width=100/00038-3630244499.jpeg";
    imgElement.onload = () => {
      const imgInstance = new fabric.FabricImage(imgElement, {
        left: 330,
        top: 30,
      });
      canvas.add(imgInstance);
      canvas.renderAll(); // Render the canvas after adding the image
    };
  };

  const addPath = () => {
    if (!canvas) return; // Ensure canvas is initialized
    const path = new fabric.Path(
      "M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
-2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
-20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z"
    );
    path.set({ left: 70, top: 290, fill: "green" });
    canvas.add(path);
    canvas.renderAll(); // Render the canvas after adding
  };

  const renderProperties = (object) => {
    const properties = ["top", "left", "width", "height", "radius", "text"];

    return properties
      .filter((prop) => object[prop] !== undefined)
      .map((prop) => (
        <p key={prop}>
          {prop.charAt(0).toUpperCase() + prop.slice(1)}:{" "}
          {typeof object[prop] === "number"
            ? object[prop].toFixed(2)
            : object[prop].toString()}
        </p>
      ));
  };

  const handleColorChange = (event) => {
    if (selectedObject.type === "image") {
      alert("Cannot change color of image");
    } else {
      const newColor = event.target.value;
      setColor(newColor); // Update local color state
      if (selectedObject) {
        selectedObject.set({ fill: newColor });
        canvas.renderAll();
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "15px", padding: "10px" }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          style={{ border: "1px solid black" }}
        />
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addTextBox}>Add Text</button>
        <button onClick={addImage}>Add Image</button>
        <button onClick={addPath}>Add Path</button>
      </div>
      {/* <button onClick={HandleChangeColor}>Change Color</button> */}
      {selectedObject && (
        <div className="properties">
          {/* <button onClick={renderProperties(selectedObject)}>Show Details</button> */}
          <h3>Type: {selectedObject.type}</h3>
          {renderProperties(selectedObject)}
          <form>
            <div className="fill">
              Fill Color:
              <label>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  checked={color === "red"}
                  onChange={handleColorChange}
                />
                Red
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="white"
                  checked={color === "white"}
                  onChange={handleColorChange}
                />
                White
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="black"
                  checked={color === "black"}
                  onChange={handleColorChange}
                />
                Black
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  checked={color === "green"}
                  onChange={handleColorChange}
                />
                Green
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  checked={color === "blue"}
                  onChange={handleColorChange}
                />
                Blue
              </label>
            </div>
          </form>
          {/* <p>Top: {selectedObject.top.toFixed(2)}</p>
          <p>Left: {selectedObject.left.toFixed(2)}</p>
          {selectedObject.width && (
            <p>Width: {selectedObject.width.toFixed(2)}</p>
          )}
          {selectedObject.height && (
            <p>Height: {selectedObject.height.toFixed(2)}</p>
          )}
          {selectedObject.fill && <p>Fill: {selectedObject.fill}</p>}
        */}
        </div>
      )}
    </div>
  );
};

export default Canvas;
