import React, {useContext} from 'react'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import {Accordion, AccordionContext} from "react-bootstrap";
import {menuList} from './menu'
import './style.scss'

function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <button
            type="button"
            style={{ backgroundColor: isCurrentEventKey ? '#5B7ED7' : 'lavender' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

function App() {
  return (
    <div>
        <Accordion defaultActiveKey="0">
            <div>
                <ContextAwareToggle className="menu" variant="link" eventKey="0">
                    Click me!
                </ContextAwareToggle>
                <Accordion.Collapse eventKey="0">
                    <Accordion style={{marginLeft: 30}} defaultActiveKey="0">
                        {menuList.map((menu, index) => {
                            return (
                                <div>
                                    <ContextAwareToggle variant="link" eventKey={index+1}>
                                        <span>{menu.parentStateName}</span> - <span>{menu.count}</span>
                                    </ContextAwareToggle>
                                    <Accordion.Collapse eventKey={index+1} style={{marginLeft: 30}}>
                                        <ul>
                                            {menu.items.map((subMenu) => {
                                                return (
                                                    <li>
                                                        <span>{subMenu.stateName}</span> - <span>{subMenu.count}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </Accordion.Collapse>
                                </div>
                            )
                        })}
                    </Accordion>
                </Accordion.Collapse>
            </div>
            <div>
                <ContextAwareToggle variant="link" eventKey="1">
                    Click me!
                </ContextAwareToggle>
                <Accordion.Collapse eventKey="1">
                    <div>Hello! I'm another body</div>
                </Accordion.Collapse>
            </div>
        </Accordion>
    </div>
  );
}

export default App;
