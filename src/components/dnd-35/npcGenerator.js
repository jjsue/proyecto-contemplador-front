import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import { pnjGeneratorCallDnD35 } from './../calls/api-calls';
import ShowNPC from './showNPC';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class NpcGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            formNivel: '1',
            formRaza: 'humano',
            formClase: 'barbaro',
            formDados: '2d6',
            renderingNow: '',
            title: 'Generador de PNJ 3.5',
            saveResponse: null,
            characterName: '',
            form:
                <>
                    <Form onSubmit={this.submitController}>
                        <div className="container">
                            <div className="row">
                                <Form.Group controlId="nivel" className="col-sm">
                                    <Form.Label>Nivel:</Form.Label>
                                    <Form.Control as="select" onChange={this.levelController}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                        <option value='11'>11</option>
                                        <option value='12'>12</option>
                                        <option value='13'>13</option>
                                        <option value='14'>14</option>
                                        <option value='15'>15</option>
                                        <option value='16'>16</option>
                                        <option value='17'>17</option>
                                        <option value='18'>18</option>
                                        <option value='19'>19</option>
                                        <option value='20'>20</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="raza" className="col-sm">
                                    <Form.Label>Raza:</Form.Label>
                                    <Form.Control as="select" onChange={this.raceController}>
                                        <option value='humano'>Humano</option>
                                        <option value='elfo'>Elfo</option>
                                        <option value='enano'>Enano</option>
                                        <option value='gnomo'>Gnomo</option>
                                        <option value='mediano'>Mediano</option>
                                        <option value='semielfo'>Semielfo</option>
                                        <option value='semiorco'>Semiorco</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="clase" className="col-sm">
                                    <Form.Label>Clase</Form.Label>
                                    <Form.Control as="select" onChange={this.classController}>
                                        <option value='barbaro'>Bárbaro</option>
                                        <option value='bardo'>Bardo</option>
                                        <option value='clerigo'>Clérigo</option>
                                        <option value='druida'>Druida</option>
                                        <option value='explorador'>Explorador</option>
                                        <option value='guerrero'>Guerrero</option>
                                        <option value='hechicero'>Hechicero</option>
                                        <option value='mago'>Mago</option>
                                        <option value='monje'>Monje</option>
                                        <option value='paladin'>Paladin</option>
                                        <option value='picaro'>Pícaro</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="dados" className="col-sm">
                                    <Form.Label>Dados:</Form.Label>
                                    <Form.Control as="select" onChange={this.diceController}>
                                        <option value='2d6'>2d6</option>
                                        <option value='3d6'>3d6</option>
                                        <option value='4d6'>4d6</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="row">
                                <Button type="submit" className="col-sm">Generar</Button>
                            </div>
                        </div>
                    </Form>
                </>,
            responseState: null,
            bottomChildren: <>
                <div className="col-md">
                    <Button type="submit" size="lg" block onClick={this.onClickGenerateAndDownload}>Descargar</Button>
                </div>
                <div className="col-md">
                    <Button variant="warning" size="lg" block onClick={this.onClickChildrenReturn}>Crear otro</Button>{' '}
                </div>
                <div className="col-md">
                    <Button variant="warning" size="lg" block onClick={this.onClickGenerateOther}>Generar otro igual</Button>{' '}
                </div>
            </>,
        }
    }
    componentDidMount() {
        this.setState({ renderingNow: this.state.form });
    }
    levelController = (event) => {
        this.setState({ formNivel: event.target.value });
    }
    raceController = (event) => {
        this.setState({ formRaza: event.target.value });
    }
    classController = (event) => {
        this.setState({ formClase: event.target.value });
    }
    diceController = (event) => {
        this.setState({ formDados: event.target.value });
    }
    onClickChildrenReturn = (event) => {
        event.preventDefault();
        this.setState({
            renderingNow: this.state.form,
            title: "Generador de NPC",
        });
    }
    onClickGenerateAndDownload = (event) => {
        try {
            event.preventDefault();
            //Rellenamos las habilidades
            let rellenoHabilidades = [
                [{ text: 'Nombre', style: 'tableHeader', bold: true, alignment: 'center', fillColor: '#ffff80' },
                { text: 'Mod. Hab.', style: 'tableHeader', bold: true, alignment: 'center', fillColor: '#ffff80' },
                { text: 'Caract.', style: 'tableHeader', bold: true, alignment: 'center', fillColor: '#ffff80' },
                { text: 'Rangos', style: 'tableHeader', bold: true, alignment: 'center', fillColor: '#ffff80' },
                { text: 'Varios', style: 'tableHeader', bold: true, alignment: 'center', fillColor: '#ffff80' }]
            ];
            for (let i = 0; i < this.state.responseState.data.createdCharacter.habilidades.length; i++) {
                rellenoHabilidades.push([
                    { text: this.state.responseState.data.createdCharacter.habilidades[i][6] ? this.state.responseState.data.createdCharacter.habilidades[i][0] + ' *' : this.state.responseState.data.createdCharacter.habilidades[i][0], bold: true, alignment: 'center', fillColor: this.state.responseState.data.createdCharacter.habilidades[i][7] ? '#ccffff' : '#ffffff' },
                    { text: (this.state.responseState.data.createdCharacter.habilidades[i][3] + this.state.responseState.data.createdCharacter.habilidades[i][4] + this.state.responseState.data.createdCharacter.habilidades[i][5]), bold: false, alignment: 'center', fillColor: this.state.responseState.data.createdCharacter.habilidades[i][7] ? '#ccffff' : '#ffffff' },
                    { text: this.state.responseState.data.createdCharacter.habilidades[i][3], bold: false, alignment: 'center', fillColor: this.state.responseState.data.createdCharacter.habilidades[i][7] ? '#ccffff' : '#ffffff' },
                    { text: this.state.responseState.data.createdCharacter.habilidades[i][4], bold: false, alignment: 'center', fillColor: this.state.responseState.data.createdCharacter.habilidades[i][7] ? '#ccffff' : '#ffffff' },
                    { text: this.state.responseState.data.createdCharacter.habilidades[i][5], bold: false, alignment: 'center', fillColor: this.state.responseState.data.createdCharacter.habilidades[i][7] ? '#ccffff' : '#ffffff' }])
            }
            const caracteristicasPdfTable = {
                headerRows: 2,
                widths: ['auto', 'auto', 'auto'],
                body: [
                    [{ text: 'Características', style: 'tableHeader', bold: true, alignment: 'center', colSpan: 3, fillColor: '#ffff80' }, {}, {}],
                    [{ text: 'Caract.', bold: true, fillColor: '#ffff80' }, { text: 'Punt.', bold: true, fillColor: '#ffff80' }, { text: 'Mod.', bold: true, fillColor: '#ffff80' }],
                    [{ text: 'Fue', bold: true, fillColor: '#ffff80' }, this.state.responseState.data.createdCharacter.caracteristicas.Fue[0], this.state.responseState.data.createdCharacter.caracteristicas.Fue[1]],
                    [{ text: 'Des', bold: true, fillColor: '#ffff80' }, this.state.responseState.data.createdCharacter.caracteristicas.Des[0], this.state.responseState.data.createdCharacter.caracteristicas.Des[1]],
                    [{ text: 'Con', bold: true, fillColor: '#ffff80' }, this.state.responseState.data.createdCharacter.caracteristicas.Con[0], this.state.responseState.data.createdCharacter.caracteristicas.Con[1]],
                    [{ text: 'Int', bold: true, fillColor: '#ffff80' }, this.state.responseState.data.createdCharacter.caracteristicas.Int[0], this.state.responseState.data.createdCharacter.caracteristicas.Int[1]],
                    [{ text: 'Sab', bold: true, fillColor: '#ffff80' }, this.state.responseState.data.createdCharacter.caracteristicas.Sab[0], this.state.responseState.data.createdCharacter.caracteristicas.Sab[1]],
                    [{ text: 'Car', bold: true, fillColor: '#ffff80' }, this.state.responseState.data.createdCharacter.caracteristicas.Car[0], this.state.responseState.data.createdCharacter.caracteristicas.Car[1]],
                ]
            }
            const habilidadesPdfTable = {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
                body: rellenoHabilidades,
            }
            const salvacionesPdfTable = {
                headerRows: 1,
                widths: ['auto', 'auto'],
                body: [
                    [{ text: 'Salvaciones', style: 'tableHeader', bold: true, alignment: 'center', colSpan: 2, fillColor: '#ffff80' }, {}],
                    ['Fortaleza', this.state.responseState.data.createdCharacter.caracteristicas.Con[1] + this.state.responseState.data.createdCharacter.salvaciones.fortaleza],
                    ['Reflejos', this.state.responseState.data.createdCharacter.caracteristicas.Des[1] + this.state.responseState.data.createdCharacter.salvaciones.reflejos],
                    ['Voluntad', this.state.responseState.data.createdCharacter.caracteristicas.Sab[1] + this.state.responseState.data.createdCharacter.salvaciones.voluntad],
                ]
            }
            const CAPdfTable = {
                headerRows: 1,
                widths: ['auto', 'auto'],
                body: [
                    [{ text: 'CA', style: 'tableHeader', bold: true, alignment: 'center', colSpan: 2, fillColor: '#ffff80' }, {}],
                    ['Total', this.state.responseState.data.createdCharacter.ca[0]],
                    ['Toque', this.state.responseState.data.createdCharacter.ca[1]],
                    ['Desprevenido', this.state.responseState.data.createdCharacter.ca[2]]
                ]
            }
            function widthsAtaqueBase(ataquesBase) {
                let toReturn = []
                for (let i = 0; i < ataquesBase.length; i++) {
                    toReturn.push('auto');
                }
                return toReturn;
            }
            function bodyAtaqueBase(ataquesBase) {
                let toReturn = [
                    [{ text: 'Ataque base', style: 'tableHeader', bold: true, alignment: 'center', colSpan: ataquesBase.length, fillColor: '#ffff80' }],
                    []
                ]
                for (let i = 0; i < ataquesBase.length; i++) {
                    (i > 0) ? toReturn[0].push({}) : toReturn[0] = toReturn[0];
                    toReturn[1].push(ataquesBase[i]);
                }
                return toReturn;
            }
            const ataqueBasePdfTable = {
                headerRows: 1,
                widths: widthsAtaqueBase(this.state.responseState.data.createdCharacter.ataqueBase),
                body: bodyAtaqueBase(this.state.responseState.data.createdCharacter.ataqueBase),
            }
            console.log(ataqueBasePdfTable);
            console.log(CAPdfTable);

            var pdfToDownload = {
                content: [
                    { text: "Tu personaje:" },
                    {
                        columns: [
                            [
                                { //Tabla de caracteristicas
                                    table: caracteristicasPdfTable,
                                    width: 'auto',
                                    margin: [0, 0, 1, 2], //izq arriba derecha abajo
                                },
                                { //Tabla salvaciones
                                    table: salvacionesPdfTable,
                                    width: 'auto',
                                    margin: [0, 0, 1, 2],
                                },
                                { //Tabla CA
                                    table: CAPdfTable,
                                    width: 'auto',
                                    margin: [0, 0, 1, 2],
                                },
                                { //Tabla Ataque base
                                    table: ataqueBasePdfTable,
                                    width: 'auto',
                                    margin: [0, 0, 1, 2],
                                },
                            ],
                            { //Tabla Habilidades
                                table: habilidadesPdfTable,
                                width: 'auto',
                                margin: [1, 0, 1, 0],
                            },
                        ],
                    }
                ]
            }
            pdfMake.createPdf(pdfToDownload).download();
        }
        catch (err) {
            console.log(err);
        }
    }
    onClickGenerateOther = async (event) => {
        event.preventDefault();
        try {
            let response = await pnjGeneratorCallDnD35(this.state.formNivel, this.state.formClase, this.state.formRaza, this.state.formDados);
            this.setState({ responseState: response });
            this.evaluator(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    submitController = async (event) => {
        event.preventDefault();
        this.setState({ disabled: true });
        try {
            let response = await pnjGeneratorCallDnD35(this.state.formNivel, this.state.formClase, this.state.formRaza, this.state.formDados);
            this.setState({ responseState: response });
            this.evaluator(response);
        } catch (err) {
            console.log(err);
        }
    }
    submitSave = async (event) => {
        event.preventDefault();
        try {
            this.setState({ disabled: true });
            const dataToSend = this.state.responseState.data.createdCharacter;
            dataToSend.name = this.state.characterName;
            //this.setState({ saveResponse: await characterSaveCall(dataToSend) });
            if (this.state.saveResponse.status === 201) {
                this.setState({
                    bottomChildren:
                        <>
                            <div className="col-md">
                                <Form onSubmit={this.submitSave}>
                                    <div className="row">
                                        <Form.Group className="col-sm">
                                            <Form.Control size="lg" type="text" placeholder="Nombre del personaje" disabled onChange={this.onChangeSave} />
                                        </Form.Group>
                                    </div>
                                    <div className="row">
                                        <Button type="submit" size="lg" className="col-sm disabled">Guardado</Button>
                                    </div>
                                </Form>
                            </div>
                            <div className="col-md">
                                <Button variant="warning" size="lg" block onClick={this.onClickChildrenReturn}>Crear otro</Button>{' '}
                            </div>
                        </>

                })
            }
            else if (this.state.saveResponse.status === 422) {
                alert('Ya tienes un personaje igual o la request no es válida, intenta de nuevo mas tarde')
            }
            else {
                alert("Ha ocurrido un error, intentelo mas tarde");
            }

        } catch (err) {
            console.log(err);
        }
    }
    onChangeSave = (event) => {
        this.setState({ characterName: event.target.value });
    }
    evaluator = (responseData) => {
        if (responseData.status === 200) {
            this.setState({
                renderingNow: <ShowNPC data={responseData.data.createdCharacter} bottom={this.state.bottomChildren} />,
                title: "Tu personaje",
            });
            if (responseData.status === 422) {
                alert('Ya tienes un personaje igual o la request no es válida, intenta de nuevo mas tarde')
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.bottomChildren !== this.state.bottomChildren) {
            this.setState({
                renderingNow: <ShowNPC data={this.state.responseState.data.createdCharacter} bottom={this.state.bottomChildren} />,
            });
        }
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="card border-0 shadow my-5">
                        <div className="card-body p-5 bodyGen">
                            <h1 className="font-weight-light">{this.state.title}</h1>
                            <hr />
                            {this.state.renderingNow}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}