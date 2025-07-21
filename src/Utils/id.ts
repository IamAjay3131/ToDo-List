let currenrId=0;
const createId = () :number => {
    
    currenrId += 1;

    return currenrId
}
 
export const startId = () =>{
    currenrId = 0;
    
}
export default createId;