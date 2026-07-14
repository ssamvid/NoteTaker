// Four hardcoded sample notes shown on first load (Week 1 requirement).
// From Week 2 onward these simply seed the useState array in App.jsx.
const sampleNotes = [
    {
      id: 1,
      title: 'Grocery list',
      body: 'Eggs, spinach, oats, coffee beans, and something for dinner Friday.',
      category: 'Personal',
      updatedAt: '2026-07-01',
    },
    {
      id: 2,
      title: 'Sprint planning notes',
      body: 'Split the API work into three tickets. Ask design about the modal spacing before Thursday standup.',
      category: 'Work',
      updatedAt: '2026-07-02',
    },
    {
      id: 3,
      title: 'React hooks recap',
      body: 'useState holds local memory, useEffect runs side effects after render. Remember the dependency array controls when it re-runs.',
      category: 'Study',
      updatedAt: '2026-07-03',
    },
    {
      id: 4,
      title: 'Weekend trip ideas',
      body: 'Look into the coastal trail, check bus times, pack light — just a day bag.',
      category: 'Personal',
      updatedAt: '2026-07-04',
    },
  ]
  
  export default sampleNotes
  