import { marked, Renderer } from 'marked';

const renderer = new Renderer();

// Disabilita il rendering di HTML raw
renderer.html = ({ text }) => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

marked.setOptions({
  renderer
});

export { marked };
