import { Plus } from "lucide-react";

function AddButton() {
    return (
      <div className="fixed bottom-5 right-5 translate-[-50%]">
        <button
          className="bg-black rounded-full w-10 h-10 text-white flex justify-center items-center cursor-pointer outline-offset-4 outline-black hover:outline-2"
          type="button"
        >
          <Plus />
        </button>
      </div>
    );
}

export default AddButton;