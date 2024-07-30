import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric"; // Correct import for fabric

const Canvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current);
    setCanvas(canvasInstance);

    canvasInstance.on("selection:created", (event) => {
      setSelectedObject(event.selected[0]);
    });

    canvasInstance.on("selection:updated", (event) => {
      setSelectedObject(event.selected[0]);
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
      fill: "blue",
    });
    canvas.add(rect);
    canvas.renderAll(); // Render the canvas after adding the rectangle
  };

  const addCircle = () => {
    if (!canvas) return; // Ensure canvas is initialized
    const circle = new fabric.Circle({
      radius: 50,
      fill: "red",
      left: 200,
      top: 200,
    });
    canvas.add(circle);
    canvas.renderAll(); // Render the canvas after adding the circle
  };

  const addTextBox = () => {
    if (!canvas) return; // Ensure canvas is initialized
    const text = new fabric.Textbox("Hello World", {
      left: 50,
      top: 200,
      fill: "black",
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
    const path = new fabric.Path("M 0 0 L 150 100 L 170 200 z");
    path.set({ left: 70, top: 290, fill: "green" });
    canvas.add(path);
    canvas.renderAll(); // Render the canvas after adding
  };

  const renderProperties = (object) => {
    const properties = [
      "top",
      "left",
      "width",
      "height",
      "fill",
      "radius",
      "text",
    ];

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
      {selectedObject && (
        <div className="properties">
          {/* <button onClick={showDetails}></button> */}
          <h3>Type: {selectedObject.type}</h3>
          {renderProperties(selectedObject)}

          {/* <form>
            <div className="fill">
              Fill Color:
              <label>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  checked={selectedObject.fill === "red"}
                  // onChange={handleColorChange}
                />
                Red
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="white"
                  checked={selectedObject.fill === "white"}
                  // onChange={handleColorChange}
                />
                White
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="black"
                  checked={selectedObject.fill === "black"}
                  // onChange={handleColorChange}
                />
                Black
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  checked={selectedObject.fill === "green"}
                  // onChange={handleColorChange}
                />
                Green
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  checked={selectedObject.fill === "blue"}
                  // onChange={handleColorChange}
                />
                Blue
              </label>
            </div>
            top:{" "}
            <input type="text" placeholder={selectedObject.top.toFixed(2)} />
            left:{" "}
            <input type="text" placeholder={selectedObject.left.toFixed(2)} />
            <button>Change</button>
          </form> */}
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
