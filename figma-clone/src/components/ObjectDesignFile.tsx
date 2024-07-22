import PlanTypeBadge from "./common/ui/PlanTypeBadge";

export default function ObjectDesignFile() {
  // Get the folderName from the context  
  // folderType -> drafts or recent, folderName -> Untitled
  // Get the context of plan either free or premium
  // create a useState to update the name or to display it...
  return (
    <>
      <div className="flex items-center p-3 pl-2 pt-4 mr-64">
        <h3 className="flex items-center space-x-2">
          <span className="text-gray-100 opacity-40">Drafts</span>
          <span>/</span>
          <span className="flex items-center">
            <input
              type="text"
              defaultValue="Untitled"
              className="w-20 bg-transparent border-none text-white 
               focus:outline-none placeholder:text-white"/>
            <PlanTypeBadge />
          </span>
        </h3>
      </div>
    </>
  )
}
