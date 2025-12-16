import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import multipart, {MultipartFile} from '@fastify/multipart';
import {getIdByName, getAvatarByName} from '../db/get.js';
import {updateUser} from '../db/update.js';
import { promises as fs } from 'fs';

interface UserRequestBody extends FormData {
	color: string;
	desc: string;
	name: string;
	avatarNull: string;
}

async function saveAvatar(buffer: Buffer, path: string): Promise<string> {
	try {
		const filePath = `./public/image/avatar/${path}`;
		await fs.mkdir("./public/image/avatar/user", { recursive: true });
		await fs.writeFile(filePath, buffer, {encoding:'utf8',flag:'w'});
		return path;
	}
	catch (error) {
		return "";
	}
}

export async function userSettingsRt(server: FastifyInstance) {

	server.register(multipart, { attachFieldsToBody: true });

	server.post('/api/user/settings', async (req, reply) => {
		try {
			const formData = await req.formData() as UserRequestBody; 
			const name = formData.get("name") as string;

			const id = await getIdByName(name, server.db);
			if (!id)
				return reply.status(401).send({ message: 'error id' });

			const color = formData.get("color") as string;
			const desc = formData.get("desc") as string;
			const dontChangeAvatar = formData.get("dontChangeAvatar") as string;
			const avatarNull = formData.get("avatarNull") as string;

			var avatar = null;
			var path: string = "";
			if (avatarNull == "0") {
				avatar = formData.get("avatar") as {type: string};

				const body = req.body as {avatar: {_buf: Buffer}};
				const buf = body.avatar._buf;
				path = await saveAvatar(buf, `user/${name}.${avatar.type.split("/").pop()}`);
			}
			else if (dontChangeAvatar == "1")
			{
				path = await getAvatarByName(name, server.db);
				if (path == undefined)
					path = "";
			}

			await updateUser(path, desc, color, id, server.db);

			return reply.send({
				message: 'succes',
				filePath: path,
				name: name,
				color: color,
				desc: desc
			});
		}
		catch (err) {
			return reply.status(500).send({ error: 'error with the user settings' });
		}
	});
}
