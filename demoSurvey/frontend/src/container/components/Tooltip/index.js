import React, { useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

const Tip = ({ className, content }) => {
  const [copy, setCopyState] = useState(false);

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  return (
    <div>
      <div
        className={className}
        ref={setTriggerRef}
        onClick={() => setCopyState(true)}
      >
        {content}
      </div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {copy ? 'Copied' : 'Copy'}
        </div>
      )}
    </div>
  );
};

export default Tip;
