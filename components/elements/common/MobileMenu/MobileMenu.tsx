import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoMenu, IoClose } from 'react-icons/io5';

import { useWindowResize } from '../../../../hooks/useWindowResize';

import { breakPoint } from '../../../../const/styles/breakPoint';

const WrapperDiv = styled.div`
  @media ${breakPoint.tablet} {
    display: none;
  }
`;

const Container = styled.div<{isOpen: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 1000;
  overflow: hidden; /* Disable scrolling in the menu */
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40%;
  width: calc(100% - 1.5em);
  background-color: ${(props) => props.theme.colors.componentBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 3em;
`;

const ContentItemDiv = styled.div`
  padding: 0.5em;
`;

const ButtonWrapper = styled.button`
  position: absolute;
  top: 16px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2em;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  z-index: 1100;
`;

type Props = {
  items: React.ReactNode[];
}

// TODO: fix later

const MobileMenu = ({ items }: Props) => {
  // TODO: when the screen size changes from mobile to PC: close
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBelowBreakPoint] = useWindowResize();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // close menu when the screen size goes bigger than the breakpoint
  useEffect(() => {
    if (!isBelowBreakPoint) {
      setIsOpen(false);
    }
  }, [isBelowBreakPoint]);

  useEffect(() => {
    const body = document.body;

    // disable scrolling when the menu is open, re-enable scrolling when the menu is closed
    isOpen
      ? body.style.overflow = 'hidden'
      : body.style.overflow = 'auto';

    // re-enable scrolling when the component unmounts
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <WrapperDiv>
      <ButtonWrapper onClick={toggleMenu}>
        {isOpen ? <IoClose /> : <IoMenu />}
      </ButtonWrapper>
      <Container isOpen={isOpen} onClick={closeMenu}>
        <ContentsContainer onClick={(e) => e.stopPropagation()}>
          {items.map((item, index) => (
            <ContentItemDiv key={index}>{item}</ContentItemDiv>
          ))}
        </ContentsContainer>
      </Container>
    </WrapperDiv>
  );
};

export default MobileMenu;