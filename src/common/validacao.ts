import { BadRequestException } from '@nestjs/common';

export function texto(value: unknown, campo: string, max: number): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    throw new BadRequestException(`${campo} é obrigatório e deve ter até ${max} caracteres.`);
  }
  return value.trim();
}

export function emailValido(value: unknown): string {
  const email = texto(value, 'E-mail', 150).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new BadRequestException('Informe um e-mail válido.');
  }
  return email;
}

export function senhaValida(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || Buffer.byteLength(value, 'utf8') > 72) {
    throw new BadRequestException('Informe uma senha com até 72 bytes.');
  }
  return value;
}
