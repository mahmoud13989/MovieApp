// const createAutoComplete = ({root,fetchData,onOptionSelect,renderOption,inputValue})=>{
//     root.innerHTML = `
//       <label><b>Search Here</b></label>
//       <input class="input"></input>
//       <div class="dropdown">
//         <div class="dropdown-menu">
//           <div class="dropdown-content results"></div>
//         </div>
//       </div>
//     `
//     const input = document.querySelector('input');
//     const dropdown = document.querySelector('.dropdown');
//     const resultRwapper = document.querySelector('.results');
//     const onInput = async (event)=>{
//       const items =  await fetchData(event.target.value);
//       if (!items.length)
//         dropdown.classList.remove('is-active');
//       dropdown.classList.add('is-active');
//       for (let item of items){
//         const option = document.createElement('a');
//         option.classList.add('dropdown-item');
//         option.innerHTML = renderOption(item);
//         resultRwapper.appendChild(option);
//         option.addEventListener('click',()=>{
//           dropdown.classList.remove('is-active');
//           input.value = inputValue(item);
//           onOptionSelect(item);
//         })
//       }
//     }
    
//     input.addEventListener('input',debounce(onInput))
//     document.addEventListener('click',(event)=>{
//         if (!root.contains(event.target))
//             dropdown.classList.remove('is-active');
//     });
// }

























const createAutoComplete = ({ root, fetchData, renderOption, inputValue, onOptionSelect }) => {
  root.innerHTML = `
         <label><b>Search Here</b></label>
         <input class="input"></input>
         <div class="dropdown">
           <div class="dropdown-menu">
             <div class="dropdown-content results"></div>
           </div>
         </div>
       `;
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultWrapper = root.querySelector('.results');
    const onInput = async (event) => {
        const items = await fetchData(event.target.value);
        if (!items.length) {
            dropdown.classList.remove('is-active')
            return;
        }
        dropdown.classList.add('is-active')
        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            resultWrapper.appendChild(option);
            option.addEventListener('click', (event) => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            })
        }
    }
     input.addEventListener('input',debounce(onInput))
    document.addEventListener('click', (event) => {
      if (root.contains(event.target) !== true)
        dropdown.classList.remove('is-active')
    });
}


















