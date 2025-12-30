## Custom Multiple Select Component

This is a fully custom-built multiple selection dropdown component in React (no external libraries required). It allows users to select multiple options from a dropdown list, displays selected items as removable chips/tags (pills), and provides a clean, modern UI.

### Features
- Multiple selection using native `<select multiple>`
- Selected items appear as styled chips with a remove (×) button
- Controlled component using React `useState`
- Smooth add/remove functionality
- Responsive and visually appealing design with rounded chips
- Works with keyboard (Ctrl/Cmd + click) and mouse selection
- Pure React + inline styles (easy to customize)

### Preview
The component shows:
- A bordered area at the top displaying selected names as blue pills with a close button
- A scrollable multiple-select dropdown below to choose more options

### How to Use

Simply import and use the component in your React app:

```jsx
import CustomMultipleSelect from './CustomMultipleSelect';

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h3>Select Team Members:</h3>
      <CustomMultipleSelect />
    </div>
  );
}
