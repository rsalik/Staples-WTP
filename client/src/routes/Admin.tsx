import React from 'react';
import UnitSettings from '../components/admin/UnitSettings';
import DraftStatusTable from '../components/DraftStatusTable';
import Schedule from '../components/Schedule';
import { AllSlots } from '../components/Slots';
import Tabs from '../components/Tabs';
import { getUserInfo } from '../oauth/authUtils';
import '../styles/routes/Admin.scss';

interface AdminProps {
  match: any;
}

enum AdminTab {
  NONE,
  UNITS,
  CALENDAR,
  SCHEDULE,
  DRAFT_STATUSES
}

const UnitTab = ['1', '2', '3', '4', '5', '6'];

interface AdminState {
  tabIndex: number;
  unitTabIndex: number;
  selectedDate?: Date;
  calendarFade?: boolean;
  access: boolean;
}

export default class Admin extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);
    this.state = {
      tabIndex: AdminTab.NONE,
      unitTabIndex: 0,
      selectedDate: undefined,
      access: false,
    };
  }

  componentDidMount() {
    HasAdminAccess().then((a) => this.setState({ access: a }));
  }

  render() {
    if (!this.state.access) return this.NoAccessPage();

    return (
      <div className="section admin">
        <div
          className="title"
          onClick={() => {
            this.setState({ tabIndex: AdminTab.NONE });
          }}
        >
          Super Secret Admin Page (Top Secret)
        </div>
        <div className="tabs flex">
          {Tabs(Object.keys(AdminTab), this.state.tabIndex, (tab: number) => this.setState({ tabIndex: tab }))}
        </div>
        {this.state.tabIndex === AdminTab.UNITS && (
          <div>
            <div className="unit tabs flex">
              {Tabs(UnitTab, this.state.unitTabIndex, (tab: number) => this.setState({ unitTabIndex: tab }), false)}
            </div>
            <UnitSettings unitNum={UnitTab[this.state.unitTabIndex]} />
          </div>
        )}
        {this.state.tabIndex === AdminTab.CALENDAR && <Schedule admin />}
        {this.state.tabIndex === AdminTab.SCHEDULE && <AllSlots admin />}
        {this.state.tabIndex === AdminTab.DRAFT_STATUSES && <DraftStatusTable admin />}
      </div>
    );
  }

  private NoAccessPage() {
    return (
      <div className="section admin">
        <div className="no-access">
          <div className="title">Go away, Trumbull ????</div>
          <div className="sub">You don't have access to view this page. Try logging in?</div>
        </div>
      </div>
    );
  }
}

export async function HasAdminAccess() {
  let info = await getUserInfo();

  return (info && info.sub) === process.env.REACT_APP_ADMIN_SUB;
}
