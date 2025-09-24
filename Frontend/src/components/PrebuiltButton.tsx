import { useDraggable } from '@dnd-kit/core'
import { Box, Button } from '@mui/material'


const PrebuiltButton = ({element,handleClick}:{element:string,handleClick:(element:string)=>void}) => {

   
    const {attributes,listeners,setNodeRef,transform}=useDraggable({id:element})
    const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <Box sx={{m:0.5,zIndex:99}} ref={setNodeRef} {...listeners} {...attributes} style={style} >
          <Button variant="contained" size='large' sx={{px:4}}  onClick={()=>handleClick(element)}>{element}</Button>
    </Box>
  )
}

export default PrebuiltButton