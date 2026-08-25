import $ from '@core/dom';

/**
 * Logic for resizing columns and rows
 * @param {MouseEvent} event
 * @param {Dom} $root
 */
export default function resizeHandler(event, $root) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $header = $resizer.closest('[data-type="resizable"]');
    const headerCoords = $header.getCoords();
    const type = $resizer.data.resize;

    let sizeTo = 0;

    $resizer.addStyle('opacity', '1');
    $root.addStyle('pointer-events', 'none');
    document.onmousemove = (e) => {
      if (type === 'column') {
        const delta = e.pageX - headerCoords.right;
        $resizer.css({
          right: `${-delta}px`,
          bottom: '-100vh'
        });
        sizeTo = headerCoords.width + delta;
      } else {
        const delta = e.pageY - headerCoords.bottom;
        $resizer.css({
          bottom: `${-delta}px`,
          right: '-100vw'
        });
        sizeTo = headerCoords.height + delta;
      }
    };
    document.onmouseup = () => {
      // Reset unnecessary events and inline styles props
      document.onmousemove = null;
      document.onmouseup = null;
      $resizer.cssClear(['opacity', 'bottom', 'right']);
      $root.cssClear(['pointer-events']);

      // Resize logic
      if (type === 'column') {
        $header.addStyle('width', `${sizeTo}px`);
        // Resizing child cells
        $root
            .findAll(`[data-col="${$header.data.col}"]`)
            .forEach((cell) => cell.style.width = `${sizeTo}px`);
      } else {
        $header.addStyle('height', `${sizeTo}px`);
      }
      resolve({
        value: sizeTo,
        id: type === 'column' ? $header.data.col : null
      });
    };
  });
};
