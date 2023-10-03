import styled from 'styled-components';

import { useState } from 'react';
import { useAppSelector } from '../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../stores/slices/colorThemeSlice';

import { ColorThemeName } from '../../../../../types/colorTheme';
import { Tab } from '../../../../../types/entity';
import TabSelectors from './TabSelectors/TabSelectors';
import TabComponent from './TabComponent/TabComponent';

const ContainerDiv = styled.div<{ colorThemeName: ColorThemeName }>`
  // 100% - (width of OnGoingTimerArea + flex gap)
  width: calc(100% - (310px + 24px));
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 24px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
`;

const TabSelectorWrapper = styled.div`
  margin-bottom: 12px;
`;

const TabComponentWrapper = styled.div`
  height: 100%;
`;

type TabsAreaProps = {
  tabs: Tab[];
};

const TabsArea = ({ tabs }: TabsAreaProps) => {
  const currentColorTheme = useAppSelector(selectColorTheme);

  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

  // on selecting a tab
  const handleSelectTab = (tab: Tab) => {
    setSelectedTab(tab);
  };

  // on creating a new tab
  const handleCreateNewTab = () => {};
  return (
    <ContainerDiv colorThemeName={currentColorTheme}>
      <TabSelectorWrapper>
        <TabSelectors
          tabs={tabs}
          selectedTabId={selectedTab.id}
          handleSelectTab={handleSelectTab}
          onClickPlusCircleButton={handleCreateNewTab}
        />
      </TabSelectorWrapper>
      <TabComponentWrapper>
        <TabComponent tab={selectedTab} />
      </TabComponentWrapper>
    </ContainerDiv>
  );
};

export default TabsArea;