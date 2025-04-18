#!/usr/bin/env python3
from PIL import Image
import os
import sys

def optimize_image(input_path, output_path, quality=85, max_size=(1200, 1200)):
    try:
        # Abrir a imagem
        img = Image.open(input_path)
        
        # Converter para RGB se for RGBA (para evitar problemas com JPEG)
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        
        # Redimensionar mantendo a proporção se a imagem for maior que max_size
        if img.width > max_size[0] or img.height > max_size[1]:
            img.thumbnail(max_size, Image.LANCZOS)
        
        # Salvar com compressão
        img.save(output_path, optimize=True, quality=quality)
        
        # Calcular redução de tamanho
        original_size = os.path.getsize(input_path)
        new_size = os.path.getsize(output_path)
        reduction = (1 - new_size / original_size) * 100
        
        print(f"Otimizado: {os.path.basename(input_path)}")
        print(f"  Tamanho original: {original_size/1024:.1f} KB")
        print(f"  Novo tamanho: {new_size/1024:.1f} KB")
        print(f"  Redução: {reduction:.1f}%")
        
        return True
    except Exception as e:
        print(f"Erro ao otimizar {input_path}: {e}")
        return False

def main():
    input_dir = "/home/ubuntu/casa_praia_site/images/original"
    output_dir = "/home/ubuntu/casa_praia_site/images/optimized"
    
    # Garantir que o diretório de saída existe
    os.makedirs(output_dir, exist_ok=True)
    
    # Processar todas as imagens no diretório de entrada
    success_count = 0
    total_count = 0
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            input_path = os.path.join(input_dir, filename)
            
            # Criar nome de arquivo para saída (convertendo para .jpg)
            base_name = os.path.splitext(filename)[0]
            output_path = os.path.join(output_dir, f"{base_name}.jpg")
            
            total_count += 1
            if optimize_image(input_path, output_path):
                success_count += 1
    
    print(f"\nOtimização concluída: {success_count}/{total_count} imagens processadas com sucesso.")

if __name__ == "__main__":
    main()
