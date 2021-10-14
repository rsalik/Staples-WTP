import React from 'react';
import '../styles/routes/Unit.scss';
import { IUnit, IUnitData } from 'wtp-shared';

import Confetti from 'react-confetti'

// Sad :(
import { ReactComponent as Unit1Img } from '../images/unit1.svg';
import { ReactComponent as Unit2Img } from '../images/unit2.svg';
import { ReactComponent as Unit3Img } from '../images/unit3.svg';
import { ReactComponent as Unit4Img } from '../images/unit4.svg';
import { ReactComponent as Unit5Img } from '../images/unit5.svg';
import { ReactComponent as Unit6Img } from '../images/unit6.svg';
import { getUnitData } from '../components/unit/UnitData';
import UnitQuestions from '../components/unit/UnitQuestions';
import UnitVideos from '../components/unit/UnitVideos';
import Tabs from '../components/Tabs';

interface UnitProps {
  match: any;
}

enum UnitTab {
  NONE,
  QUESTIONS,
  VIDEOS,
}

interface UnitState {
  unitData: IUnit;
  tabIndex: number;
}

export default class Unit extends React.Component<UnitProps, UnitState> {
  constructor(props: UnitProps) {
    super(props);

    this.state = {
      unitData: {} as IUnit,
      tabIndex: UnitTab.NONE,
    };
  }

  componentDidMount() {
    let key = this.props.match.params.unitNumber.toString() as keyof IUnitData;

    getUnitData().then((json) => {
      this.setState({ unitData: json[key], tabIndex: UnitTab.QUESTIONS });
    });
  }

  render() {
    return (
      <div className="unit section">
        {this.props.match.params.unitNumber === '3' && <Confetti numberOfPieces={500} recycle={false} confettiSource={{x: 0, y: -10, w: window.innerWidth, h: 0}}	/>}
        <div className="img-wrapper flex">{UnitImage(this.props.match.params.unitNumber)}</div>
        <div
          className="title"
          onClick={() => {
            this.setState({ tabIndex: UnitTab.NONE });
          }}
        >
          Unit {this.props.match.params.unitNumber}
        </div>
        <div className="tabs flex">
          {Tabs(Object.keys(UnitTab), this.state.tabIndex, (tab: number) => {
            if (this.state.unitData.topic) this.setState.bind(this)({ tabIndex: tab });
          })}
          <a href={this.state.unitData.gDrive}>
            <div className="tab">Google Drive</div>
          </a>
        </div>
        {this.state.tabIndex === UnitTab.QUESTIONS && <UnitQuestions unitData={this.state.unitData} />}
        {this.state.tabIndex === UnitTab.VIDEOS && <UnitVideos unitData={this.state.unitData} />}
      </div>
    );
  }
}

function UnitImage(unitNumber: any) {
  switch (unitNumber) {
    case '1':
      return <Unit1Img className="unit-img" />;
    case '2':
      return <Unit2Img className="unit-img" />;
    case '3':
      return <Unit3Img className="unit-img" />;
    case '4':
      return <Unit4Img className="unit-img" />;
    case '5':
      return <Unit5Img className="unit-img" />;
    case '6':
      return <Unit6Img className="unit-img" />;
    default:
      return <div>Error</div>;
  }
}
