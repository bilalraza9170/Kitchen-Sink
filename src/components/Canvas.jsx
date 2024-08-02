import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric"; // Correct import for fabric
import AlertModal from "./AlertModal";
import "./Canvas.css";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [properties, setProperties] = useState({
    color: "red",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    radius: 0,
  });
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState({
    rectangleC: true, //C is for Click
    circleC: true,
    textBoxC: true,
    pathC: true,
    imageC: true,
  });

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current);
    window.canvas = canvasInstance;
    setCanvas(canvasInstance);

    const updateProperties = (obj) => {
      setProperties({
        color: obj.fill ?? "red",
        top: obj.top ?? 0,
        left: obj.left ?? 0,
        width: obj.width * (obj.scaleX ?? 1) ?? 0,
        height: obj.height * (obj.scaleY ?? 1) ?? 0,
        radius: obj.radius ?? 0,
      });
    };

    canvasInstance.on("selection:created", (event) => {
      const obj = event.selected[0];
      setSelectedObject(obj);
      updateProperties(obj);
    });

    canvasInstance.on("selection:updated", (event) => {
      const obj = event.selected[0];
      setSelectedObject(obj);
      updateProperties(obj);
    });

    canvasInstance.on("object:moving", (event) => {
      const obj = event.target;
      updateProperties(obj);
    });

    // canvasInstance.on("object:scaling", (event) => {
    //   const obj = event.target;
    //   updateProperties(obj);
    // });

    canvasInstance.on("object:modified", (event) => {
      const obj = event.target;
      updateProperties(obj);
    });

    canvasInstance.on("selection:cleared", () => {
      setSelectedObject(null);
      setProperties({
        color: "red",
        top: 0,
        left: 0,
        width: 50,
        height: 50,
        radius: 0,
      });
    });

    return () => {
      canvasInstance.dispose(); // Cleanup on unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const addRectangle = () => {
    if (!canvas) return; // Ensure canvas is initialized
    console.log(isFirstClick.rectangleC);
    const rect = new fabric.Rect({
      top: isFirstClick.rectangleC ? 50 : Math.random() * (500 - 100),
      left: isFirstClick.rectangleC ? 50 : Math.random() * (1000 - 400),
      width: 400,
      height: 100,
      fill: "red",
    });
    setIsFirstClick((prev) => ({ ...prev, rectangleC: false }));
    canvas.add(rect);
    canvas.renderAll(); // Render the canvas after adding the rectangle
  };

  const addCircle = () => {
    if (!canvas) return; // Ensure canvas is initialized
    console.log(isFirstClick.circleC);
    const circle = new fabric.Circle({
      radius: 50,
      fill: "black",
      left: isFirstClick.circleC ? 100 : Math.random() * (1000 - 100),
      top: isFirstClick.circleC ? 290 : Math.random() * (500 - 100),
      height: 100,
      width: 100,
    });
    setIsFirstClick((prev) => ({ ...prev, circleC: false }));
    canvas.add(circle);
    canvas.renderAll(); // Render the canvas after adding the circle
  };

  const addTextBox = () => {
    if (!canvas) return; // Ensure canvas is initialized
    console.log(isFirstClick.textBoxC);
    const text = new fabric.Textbox("Fabric.js is awesome!!!!", {
      left: isFirstClick.textBoxC ? 50 : Math.random() * (1000 - 400),
      top: isFirstClick.textBoxC ? 200 : Math.random() * (500 - 100),
      fill: "blue",
      height: 100,
      width: 400,
    });
    setIsFirstClick((prev) => ({ ...prev, textBoxC: false }));
    canvas.add(text);
    canvas.renderAll(); // Render the canvas after adding the text
  };

  const addPath = () => {
    if (!canvas) return; // Ensure canvas is initialized
    console.log(isFirstClick.pathC);
    const path = new fabric.Path(
      "M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
-2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
-20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z"
    );
    path.set({
      left: isFirstClick.pathC ? 270 : Math.random() * (1000 - 150),
      top: isFirstClick.pathC ? 290 : Math.random() * (500 - 150),
      fill: "green",
      width: 150,
      height: 150,
    });
    setIsFirstClick((prev) => ({ ...prev, pathC: false }));
    canvas.add(path);
    canvas.renderAll(); // Render the canvas after adding
  };

  const addImage = () => {
    if (!canvas) return; // Ensure canvas is initialized
    console.log(isFirstClick.imageC);
    const imgElement = new Image();
    imgElement.src =
      "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/f3eecd58-cb2b-44ff-8947-9ba3f11ac923/width=100/00038-3630244499.jpeg";
    imgElement.onload = () => {
      const imgInstance = new fabric.FabricImage(imgElement, {
        left: isFirstClick.imageC ? 530 : Math.random() * (1000 - 450),
        top: isFirstClick.imageC ? 30 : Math.random() * (500 - 450),
        height: 450,
        width: 450,
      });
      setIsFirstClick((prev) => ({ ...prev, imageC: false }));
      canvas.add(imgInstance);
      canvas.renderAll(); // Render the canvas after adding the image
    };
  };

  const handlePropertyChange = (event, property) => {
    const value =
      property === "color"
        ? event.target.value
        : property === "width" || property === "height"
        ? parseFloat(event.target.value) || 50
        : parseFloat(event.target.value) || 0; // Default to 0 if NaN

    setProperties((prevProperties) => ({
      ...prevProperties,
      [property]: value,
    }));

    if (selectedObject) {
      if (property === "color") {
        if (selectedObject.type === "image") {
          setIsAlertModalOpen(true); // Show alert modal if object is an image
        } else {
          selectedObject.set({ fill: value });
        }
      } else if (property === "width" || property === "height") {
        const scaleXX = property === "width" ? value / selectedObject.width : 0;
        const scaleYY =
          property === "height" ? value / selectedObject.height : 0;

        selectedObject.set({
          scaleX: property === "width" ? scaleXX : selectedObject.scaleX,
          scaleY: property === "height" ? scaleYY : selectedObject.scaleY,
        });
      } else if (property === "radius" && selectedObject.type === "circle") {
        selectedObject.set({ radius: value });
      } else {
        selectedObject.set({ [property]: value });
      }
      selectedObject.setCoords(); // Update the object's coordinates
      canvas.renderAll(); // Re-render the canvas to show the updates
    }
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedObject) {
      canvas.remove(selectedObject);
      canvas.renderAll();
      setSelectedObject(null); // Clear the selection
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={closeAlertModal}
        message="Cannot change color of image"
      />
      <div style={{ display: "flex" }}>
        <div style={{ padding: "10px" }}>
          <canvas
            ref={canvasRef}
            width={1000}
            height={500}
            style={{ border: "1px solid black" }}
          />
          <button onClick={addRectangle}>Add Rectangle</button>
          <button onClick={addCircle}>Add Circle</button>
          <button onClick={addTextBox}>Add Text</button>
          <button onClick={addPath}>Add Path</button>
          <button onClick={addImage}>Add Image</button>
          <button onClick={handleDelete}>Delete Selected</button>
        </div>
        {selectedObject && (
          <div className="properties">
            <h3>Type: {selectedObject.type}</h3>
            <form>
              <div className="property fill">
                <label>
                  Fill Color:
                  <input
                    type="radio"
                    name="color"
                    value="red"
                    checked={properties.color === "red"}
                    onChange={(e) => handlePropertyChange(e, "color")}
                  />{" "}
                  Red
                  <input
                    type="radio"
                    name="color"
                    value="white"
                    checked={properties.color === "white"}
                    onChange={(e) => handlePropertyChange(e, "color")}
                  />{" "}
                  White
                  <input
                    type="radio"
                    name="color"
                    value="black"
                    checked={properties.color === "black"}
                    onChange={(e) => handlePropertyChange(e, "color")}
                  />{" "}
                  Black
                  <input
                    type="radio"
                    name="color"
                    value="green"
                    checked={properties.color === "green"}
                    onChange={(e) => handlePropertyChange(e, "color")}
                  />{" "}
                  Green
                  <input
                    type="radio"
                    name="color"
                    value="blue"
                    checked={properties.color === "blue"}
                    onChange={(e) => handlePropertyChange(e, "color")}
                  />{" "}
                  Blue
                </label>
              </div>
              <div className="property">
                <label>
                  Top: {""}
                  <input
                    type="number"
                    required
                    value={properties.top}
                    onChange={(e) => handlePropertyChange(e, "top")}
                  />
                </label>
              </div>
              <div className="property">
                <label>
                  Left: {""}
                  <input
                    type="number"
                    required
                    value={properties.left}
                    onChange={(e) => handlePropertyChange(e, "left")}
                  />
                </label>
              </div>
              <div className="property">
                <label>
                  Width: {""}
                  <input
                    type="number"
                    min={0}
                    value={properties.width}
                    onChange={(e) => handlePropertyChange(e, "width")}
                  />
                </label>
              </div>
              <div className="property">
                <label>
                  Height: {""}
                  <input
                    type="number"
                    min={0}
                    value={properties.height}
                    onChange={(e) => handlePropertyChange(e, "height")}
                  />
                </label>
              </div>

              <div className="property">
                <label>
                  Radius: {""}
                  <input
                    type="number"
                    min={0}
                    value={properties.radius}
                    onChange={(e) => handlePropertyChange(e, "radius")}
                    disabled={selectedObject.type !== "circle"}
                  />{" "}
                  (Only applicable for circles)
                </label>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
