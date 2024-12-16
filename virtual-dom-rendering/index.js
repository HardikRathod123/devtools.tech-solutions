/**
 * Read FAQs section on the left for more information on how to use the editor
 *
 * Question Link  :  https://devtools.tech/questions/s/build-a-virtual-dom-to-actual-html-dom-convertor-or-dom-renderer---qid---bAin2TEn862JTFVFgxEi
**/
// DO NOT CHANGE FUNCTION NAME

function renderAndAppend(child, parent){
    if(!child) return;

    const renderedContent = render(child);
    if(renderedContent){
      parent.appendChild(renderedContent);
    }
  }

  function renderChildren(children, element) {
    if(!children) return;

    if (typeof children === 'object' && !Array.isArray(children)) {
      Object.keys(children).forEach((key) => {
        const child = children[key];
        renderAndAppend(child, element);
      })
    }
    else {// primitive value
      renderAndAppend(children, element);
    }
  }

  function renderFragment(children){
      if(!children) return;

      const fragment = document.createDocumentFragment();
      renderChildren(children, fragment)
      return fragment
  }

  function renderElement(node){
    const element = document.createElement(node.type);
    const props = node.props || {}

    if(!element) return;

    Object.keys(props).forEach((prop) => {
      if (prop === 'children') {
        renderChildren(props.children, element)
      }
      else if (prop === 'class') {
        element.className = props[prop];
      }
      else {
        element.setAttribute(prop, props[prop]);
      }
    })

    return element;
  }

  function render(node){
    if(!node) return null; //edge cases

    if(typeof node !== 'object'){ //premetive values;
      return document.createTextNode(node.toString());
    }

    if(!node.type && node.props && node.props.children){ //fragment
      const children = node.props.children || {}
      return renderFragment(children)
    }

    return renderElement(node)
  }

  function renderToDOM(virtualNode, domNode) {
    // write your solution below
    // virtual => actual dom
    // cases of null,0, undefined, empty string
    // primitive values(string, number)
    // propr html elements with other attributes
    // fragments

    const vn = render(virtualNode);
    if (vn) domNode.appendChild(vn);
  }

  // 0: Hide test cases UI
  // 1: Show test cases UI
  window.__SHOW_ELEMENTS__ = 1;
