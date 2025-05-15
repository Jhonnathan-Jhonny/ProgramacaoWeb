document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/carros';
    const carForm = document.getElementById('carForm');
    const carsTable = document.getElementById('carsTable').getElementsByTagName('tbody')[0];
    
    // Carregar carros ao iniciar
    loadCars();
    
    // Manipular envio do formulário
    carForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            nome_modelo: document.getElementById('nome_modelo').value,
            codigo_marca: document.getElementById('codigo_marca').value,
            valor_aluguel: parseFloat(document.getElementById('valor_aluguel').value)
        };
        
        const carId = document.getElementById('codigo_modelo').value;
        
        try {
            if (carId) {
                // Atualizar carro existente
                await fetch(`${apiUrl}/${carId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                // Criar novo carro
                await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            }
            
            resetForm();
            loadCars();
        } catch (error) {
            console.error('Erro:', error);
        }
    });
    
    // Cancelar edição
    document.getElementById('cancelBtn').addEventListener('click', resetForm);
    
    // Carregar lista de carros
    async function loadCars() {
        try {
            const response = await fetch(apiUrl);
            const cars = await response.json();
            
            carsTable.innerHTML = '';
            
            cars.forEach(car => {
                const row = carsTable.insertRow();
                
                row.innerHTML = `
                    <td>${car.codigo_modelo}</td>
                    <td>${car.nome_modelo}</td>
                    <td>${car.codigo_marca}</td>
                    <td>R$ ${car.valor_aluguel.toFixed(2)}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editCar(${car.codigo_modelo})">Editar</button>
                        <button class="action-btn delete-btn" onclick="deleteCar(${car.codigo_modelo})">Excluir</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error('Erro ao carregar carros:', error);
        }
    }
    
    // Editar carro
    window.editCar = async function(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            const car = await response.json();
            
            document.getElementById('codigo_modelo').value = car.codigo_modelo;
            document.getElementById('nome_modelo').value = car.nome_modelo;
            document.getElementById('codigo_marca').value = car.codigo_marca;
            document.getElementById('valor_aluguel').value = car.valor_aluguel;
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Erro ao editar carro:', error);
        }
    }
    
    // Excluir carro
    window.deleteCar = async function(id) {
        if (confirm('Tem certeza que deseja excluir este carro?')) {
            try {
                await fetch(`${apiUrl}/${id}`, {
                    method: 'DELETE'
                });
                loadCars();
            } catch (error) {
                console.error('Erro ao excluir carro:', error);
            }
        }
    }
    
    // Resetar formulário
    function resetForm() {
        carForm.reset();
        document.getElementById('codigo_modelo').value = '';
    }
});