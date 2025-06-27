"use client";
import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
const overLay =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8";

const model =
  "relative w-full text-black max-w-md rounded-lg bg-black p-6 shadow-xl";
const xCloseButton =
  "absolute right-2 top-2 text-red-900 hover:text-red-700 cursor-pointer";

interface ModelContextType {
  open: (name: string) => void;
  close: () => void;
  openName: string;
}

// 1.create-Context
export const ModelContext = createContext<ModelContextType | null>(null);
// 2. parent component
export default function Model({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModelContext.Provider value={{ open, close, openName }}>
      {children}
    </ModelContext.Provider>
  );
}
// 3. child

type OpenProps = {
  children: ReactElement<{ onClick?: () => void }>;
  
  opens: string;
};

function Open({ children, opens }: OpenProps) {
  const context = useContext(ModelContext);
  if (!context) throw new Error("Model.Open must be used within a Model");

  const { open } = context;


  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }: { children: ReactNode; name: string }) {
  const context = useContext(ModelContext);
  if (!context) throw new Error("Model.Open must be used within a Model");

  const { close, openName } = context;
  if (openName !== name) return null;

  return createPortal(
    <div className={overLay}>
      <div className={model} onClick={(e) => e.stopPropagation()}>
        <button className={xCloseButton} onClick={close}>
          <HiXMark size={30} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
// 4. assign
Model.Open = Open;
Model.Window = Window;
