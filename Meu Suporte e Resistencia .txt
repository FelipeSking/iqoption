instrument{
    name="Sup/Res",  -- Define o nome do instrumento como "Sup/Res"
    icon='indicators:ADX',  -- Define um ícone (no caso, o indicador ADX) para o instrumento
    overlay=true  -- Define que esse indicador deve ser plotado sobre o gráfico de preços existente (overlay)
}
---------------------------PARTE 2 ---------------------

local function a()
    local b = make_series()  -- Cria uma série de dados vazia chamada 'b'
    local c = high[2]  -- Obtém o valor da alta (high) 2 barras atrás

    if not get_value(c) then
        return b
    end

    local d = high <= c and high[1] <= c and high[3] <= c and high[4] <= c  -- Condição lógica
    b:set(iff(d, c, b[1]))  -- Define o valor de 'b' com base na condição
    return b
end;

------------------------pARTE 3 ------------------------------

input_group{"Color",color=input{default="lime",type=input.color},width=input{default=1,type=input.line_width}}

h = a()  -- Chama a função 'a' e atribui o resultado a 'h'
l = e()  -- Chama a função 'e' e atribui o resultado a 'l'

hline(h,"High",color,high_width)  -- Desenha uma linha horizontal com base no valor 'h'
hline(l,"Low",color,width)  -- Desenha uma linha horizontal com base no valor 'l'


--------------------------- Parte 4----------------------------------------
hline(highest(10)[1],"HH10",color,1)  -- Desenha uma linha horizontal com base no maior valor das últimas 10 barras
hline(lowest(10)[1],"LL10",color,1)  -- Desenha uma linha horizontal com base no menor valor das últimas 10 barras
hline(highest(30)[1],"HH30",color,1)  -- Desenha uma linha horizontal com base no maior valor das últimas 30 barras
hline(lowest(30)[1],"LL30",color,1)  -- Desenha uma linha horizontal com base no menor valor das últimas 30 barras
hline(highest(60)[1],"HH60",color,1)  -- Desenha uma linha horizontal com base no maior valor das últimas 60 barras
hline(lowest(60)[1],"LL60",color,1)  -- Desenha uma linha horizontal com base no menor valor das últimas 60 barras
hline(highest(100)[1],"HH100",color,1)  -- Desenha uma linha horizontal com base no maior valor das últimas 100 barras
hline(lowest(100)[1],"LL100",color,1)  -- Desenha uma linha horizontal com base no menor valor das últimas 100 barras
hline(highest(150)[1],"HH150",color,1)  -- Desenha uma linha horizontal com base no maior valor das últimas 150 barras
hline(lowest(150)[1],"LL150",color,1)  -- Desenha uma linha horizontal com base no menor valor das últimas 150 barras
hline(highest(200)[1],"HH200",color,1)  -- Desenha uma linha horizontal com base no maior valor das últimas 200 barras
hline(lowest(200)[1],"LL200",color,1)  -- Desenha uma linha horizontal com base no menor valor das últimas 200 barras


