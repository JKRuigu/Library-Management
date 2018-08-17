class StudentPrint extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default StudentPrint;
