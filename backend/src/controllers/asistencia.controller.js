<<<<<<< HEAD
import { AppDataSource } from "../config/configDb.js";
import Asistencia from "../entity/asistencia.entity.js";


export const getAsistencias = async (req, res) => {
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        const asistencias = await asistenciaRepository.find();
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAsistencia = async (req, res) => {
    const { fecha, hora_entrada, hora_salida, usuarioId } = req.body;
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        const nuevaAsistencia = asistenciaRepository.create({
            fecha,
            hora_entrada,
            hora_salida,
            usuarioId
        });
        
        const asistencia = await asistenciaRepository.save(nuevaAsistencia);
        res.status(201).json(asistencia);
    } catch (error) {
        console.error("Error al crear asistencia:", error); // Imprimir error en la consola
        res.status(500).json({ message: error.message });
    }
};

export const updateAsistencia = async (req, res) => {
    const { id } = req.params;
    const { fecha, hora_entrada, hora_salida, rut_usuario } = req.body;
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        
        // Verificar si la asistencia existe
        const asistencia = await asistenciaRepository.findOne({ where: { id_asistencia: id } });
        if (!asistencia) {
            return res.status(404).json({ message: "Asistencia no encontrada" });
        }

        // Actualizar los campos
        asistencia.fecha = fecha;
        asistencia.hora_entrada = hora_entrada;
        asistencia.hora_salida = hora_salida;
        asistencia.usuarioId = usuarioId;

        // Guardar los cambios
        await asistenciaRepository.save(asistencia);
        res.status(200).json({ message: 'Asistencia actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
=======
import { AppDataSource } from "../config/configDb.js";
import Asistencia from "../entity/asistencia.entity.js";


export const getAsistencias = async (req, res) => {
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        const asistencias = await asistenciaRepository.find();
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAsistencia = async (req, res) => {
    const { fecha, hora_entrada, hora_salida, usuarioId } = req.body;
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        const nuevaAsistencia = asistenciaRepository.create({
            fecha,
            hora_entrada,
            hora_salida,
            usuarioId
        });
        
        const asistencia = await asistenciaRepository.save(nuevaAsistencia);
        res.status(201).json(asistencia);
    } catch (error) {
        console.error("Error al crear asistencia:", error); // Imprimir error en la consola
        res.status(500).json({ message: error.message });
    }
};

export const updateAsistencia = async (req, res) => {
    const { id } = req.params;
    const { fecha, hora_entrada, hora_salida, rut_usuario } = req.body;
    try {
        const asistenciaRepository = AppDataSource.getRepository(Asistencia);
        
        // Verificar si la asistencia existe
        const asistencia = await asistenciaRepository.findOne({ where: { id_asistencia: id } });
        if (!asistencia) {
            return res.status(404).json({ message: "Asistencia no encontrada" });
        }

        // Actualizar los campos
        asistencia.fecha = fecha;
        asistencia.hora_entrada = hora_entrada;
        asistencia.hora_salida = hora_salida;
        asistencia.usuarioId = usuarioId;

        // Guardar los cambios
        await asistenciaRepository.save(asistencia);
        res.status(200).json({ message: 'Asistencia actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
>>>>>>> 08061d1ab962fa06bd9279496e351ebdda0ac7bb
};