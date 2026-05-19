import time
import os
import sys

musica = "Água-Viva"
artista = "ANAVITÓRIA"

duracao_total = 169  # 2:49 em segundos

letras = [
    "As hastes dos seus óculos estão na mesa",
    "Os polegares neblinando as lentes",
    "O nosso passado me olha das fotografias",
    "Eu juro, já senti certeza",
    "Os meus anseios tão inconsistentes",
    "Um dia, o concreto, no outro, tudo é tão fugaz",
    "Se eu puder ter um pedido a mais",
    "Guarde o melhor que tivemos",
    "As confidências, mesmo que banais",
    "Eu deixo em segredo",
    "Nem todo mundo tem a sorte que nós dois tivemos juntos",
    "E é tão bom saber que alguém que me conhece assim tão bem existe",
    "O banco do meu carro inclina",
    "Mas nele você não se deita",
    "Eu passo em frente à sua rua",
    "Mas não ligo a seta",
    "E os hábitos que desenhamos",
    "Eu desaprendo todo dia",
    "As faltas vão doendo menos, é o que você diria",
    "Se eu puder ter um pedido a mais",
    "Guarde o melhor que tivemos",  
    "As confidências, mesmo que banais",
    "Eu deixo em segredo",
    "Nem todo mundo tem a sorte que nós dois tivemos juntos",
    "E é tão bom saber que alguém que me conhece assim tão bem existe",
]

def limpar_linha():
    os.system("cls" if os.name == "nt" else "clear")

def digitar(texto, atraso=0.06):
    """
    Percorre cada letra da frase e espera alguns milissegundos.
    """
    for letra in texto:
        sys.stdout.write(letra)
        sys.stdout.flush()
        time.sleep(atraso)
    print()  

def barra_spotify(tempo_atual, duracao):
    tamanho = 30
    progresso = int((tempo_atual / duracao) * tamanho)

    progresso = min(progresso, tamanho)
    
    barra = "━" * progresso + "●" + "─" * (tamanho - progresso)

    minutos_atual = tempo_atual // 60
    segundos_atual = tempo_atual % 60

    minutos_total = duracao // 60
    segundos_total = duracao % 60

    return f"{minutos_atual}:{segundos_atual:02d} {barra} {minutos_total}:{segundos_total:02d}"

tempo_real = 0

for frase in letras:
    limpar_linha()

    print(f"🎵 {musica}")
    print(f"👤 {artista}\n")

    print(barra_spotify(tempo_real, duracao_total))
    print()

    digitar(frase)

    time.sleep(2)

    tempo_real += 28

limpar_linha()
print(f"🎵 {musica}")
print(f"{artista}\n")
print(barra_spotify(duracao_total, duracao_total))
print("\nParabens Laninha 🎉")