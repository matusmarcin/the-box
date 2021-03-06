import {getBox} from './../';


describe('Collection box', () => {

  let elm1 = null;
  let elm2 = null;

  function createElement (style = {}) {
    let element = document.createElement('div');
    element.className = 'testElement';
    setElementStyle(element, style);
    return element;
  }

  function setElementStyle (element, style = {}) {
    for (let key in style) {
      if (style.hasOwnProperty(key)) {
        element.style[key] = style[key];
      }
    }
  }

  beforeEach(() => {
    elm1 = createElement({
      position: 'absolute',
      width: '100px',
      height: '100px',
      left: '0px',
      top: '0px'
    });
    document.body.appendChild(elm1);

    elm2 = createElement({
      position: 'absolute',
      width: '100px',
      height: '100px',
      left: '200px',
      top: '100px'
    });
    document.body.appendChild(elm2);
  });

  afterEach(() => {
    const test_elements = document.querySelectorAll('.testElement');
    for (let i = 0, j = test_elements.length; i < j; i++) {
      const element = test_elements[i];
      element.parentNode.removeChild(element);
    }
  });

  it('should get properties of HTMLCollection', () => {
    const boxes = document.getElementsByTagName('div');
    const box = getBox(boxes);
    expect(box.left).toEqual(0);
    expect(box.top).toEqual(0);
    expect(box.width).toEqual(300);
    expect(box.height).toEqual(200);
  });

  it('should get properties of NodeList', () => {
    const boxes = document.querySelectorAll('div');
    const box = getBox(boxes);
    expect(box.left).toEqual(0);
    expect(box.top).toEqual(0);
    expect(box.width).toEqual(300);
    expect(box.height).toEqual(200);
  });

  it('should treat array as collection', function () {
    const boxes = [elm1, elm2];
    const box = getBox(boxes);
    expect(box.left).toEqual(0);
    expect(box.top).toEqual(0);
    expect(box.width).toEqual(300);
    expect(box.height).toEqual(200);
  });

  it('should return zero box when not matching any elements', function () {
    const boxes = document.getElementsByTagName('xxx');
    const box = getBox(boxes);
    expect(box.left).toEqual(0);
    expect(box.top).toEqual(0);
    expect(box.width).toEqual(0);
    expect(box.height).toEqual(0);
  });

});
