// State
let columns = [];
let generatedData = [];

// DOM Elements
const numRowsInput = document.getElementById('numRows');
const columnTypeSelect = document.getElementById('columnType');
const addColumnBtn = document.getElementById('addColumnBtn');
const columnsContainer = document.getElementById('columnsContainer');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const previewContainer = document.getElementById('previewContainer');

// DOM Elements (v2)
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const viewAllBtn = document.getElementById('viewAllBtn');
const presetsModal = document.getElementById('presetsModal');
const presetsList = document.getElementById('presetsList');
const closeModalBtn = document.querySelector('.close-modal');

// Pagination
let currentPage = 1;
const rowsPerPage = 5;

// Add column to configuration
addColumnBtn.addEventListener('click', () => {
	const type = columnTypeSelect.value;
	const label = columnTypeSelect.options[columnTypeSelect.selectedIndex].text;
	
	// Special handling for number and tel types
	if (type === 'number' || type === 'tel') {
		const length = prompt(`Enter length for ${label} (1-12, or leave empty for random):`, '');
		if (length !== null) {
			columns.push({ type, label: `${label}${length ? `:${length}` : ''}` });
		}
	} else {
		columns.push({ type, label });
	}
	
	renderColumns();
});

// Render selected columns
function renderColumns() {
	columnsContainer.innerHTML = '';
	
	if (columns.length === 0) {
		columnsContainer.innerHTML = '<p style="color: var(--text-secondary);">No columns added yet</p>';
		return;
	}
	
	columns.forEach((column, index) => {
		const columnEl = document.createElement('div');
		columnEl.className = 'column-item';
		                // REPLACE columnEl.innerHTML with:
        columnEl.innerHTML = `
            <div>
                <span class="column-type">${column.label}</span>
                <div style="display:flex;align-items:center;gap:5px;margin-top:5px">
                    <input type="checkbox" id="unique_${index}" ${column.unique ? 'checked' : ''} style="margin-right:5px">
                    <label for="unique_${index}" style="font-size:0.85rem;color:var(--text-secondary)">Unique</label>
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
                <button class="btn rule-btn" data-index="${index}" style="padding:4px 8px;font-size:0.8rem">
                    <i class="fas fa-cog"></i>
                </button>
                <button class="remove-btn" data-index="${index}">×</button>
            </div>
        `;
		columnsContainer.appendChild(columnEl);
	});
	
	// Add event listeners to remove buttons
	document.querySelectorAll('.remove-btn').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const index = parseInt(e.target.dataset.index);
			columns.splice(index, 1);
			renderColumns();
		});
	});
}

// Generate random data
function generateData() {
	const numRows = parseInt(numRowsInput.value) || 10;
	generatedData = [];
	currentPage = 1;
	
	// Validate columns
	if (columns.length === 0) {
		alert('Please add at least one column');
		return;
	}
	
	// Generate rows
	for (let i = 0; i < numRows; i++) {
		const row = {};
		
		// Store name and surname for email generation
		let currentName = '';
		let currentSurname = '';
		
		columns.forEach(column => {
			const { type, label } = column;
			
			if (type === 'name') {
				currentName = getRandomItem(names);
				row[label] = currentName;
			} 
			else if (type === 'surname') {
				currentSurname = getRandomItem(surnames);
				row[label] = currentSurname;
			} 
			else if (type === 'fullname') {
				row[label] = `${getRandomItem(names)} ${getRandomItem(surnames)}`;
			} 
			else if (type === 'email') {
				// Use stored name/surname if available, otherwise generate new
				const name = currentName || getRandomItem(names);
				const surname = currentSurname || getRandomItem(surnames);
				const symbol = getRandomItem(validSymbols);
				const provider = getRandomItem(emailProviders);
				const domain = getRandomItem(domainExtensions);
				row[label] = `${name.toLowerCase()}${symbol}${surname.toLowerCase()}@${provider}.${domain}`;
			} 
			// FOR NUMBER TYPE (around line 280)
            else if (type === 'number') {
                const lengthMatch = label.match(/:(\d+)/);
                const length = lengthMatch ? parseInt(lengthMatch[1]) : Math.floor(Math.random() * 12) + 1;
                let num = generateRandomNumber(length);
                // Apply min/max
                if (column.min !== undefined || column.max !== undefined) {
                    const min = parseInt(column.min) || 0;
                    const max = parseInt(column.max) || Math.pow(10, length) - 1;
                    num = Math.floor(Math.random() * (max - min + 1)) + min;
                }
                row[label] = num.toString();
            }
			else if (type === 'tel') {
				const lengthMatch = label.match(/:(\d+)/);
				const length = lengthMatch ? parseInt(lengthMatch[1]) : Math.floor(Math.random() * 10) + 3;
				row[label] = `'+${generateRandomNumber(length)}'`;
			} 
			else if (type === 'date') {
				row[label] = generateRandomDate();
			} 
			else if (type === 'bool') {
				row[label] = Math.random() > 0.5 ? '1' : '0';
			} 
			else if (type === 'website') {
				const name = getRandomItem(websiteNames);
				const domain = getRandomItem(domainExtensions);
				row[label] = `https://www.${name}.${domain}`;
			} 
			else if (type === 'business') {
				row[label] = getRandomItem(businessNames);
			} 
			else if (type === 'department') {
				row[label] = getRandomItem(departments);
			}
			                    // ADD AFTER existing cases
            else if (type === 'edge_null') {
                row[label] = Math.random() > 0.5 ? '' : null;
            }
            else if (type === 'edge_max') {
                row[label] = 'x'.repeat(Math.floor(Math.random() * 25)); // Adjust length as needed
            }
            else if (type === 'edge_future') {
                const future = new Date();
                future.setFullYear(future.getFullYear() + 5);
                row[label] = future.toISOString().split('T')[0];
            }
            else if (type === 'edge_special') {
                row[label] = '🚀$pecial Ch@rs! 😊';
            }
			/*
			else if (column.regex && type !== 'number' && type !== 'bool' && type !== 'date') {
                // Simplified: just validate output matches regex
                // Full implementation would require regex-based generation
                const regex = new RegExp(column.regex);
                if (!regex.test(row[label])) {
                    // Fallback: append random chars until matches
                    let tries = 0;
                    while (!regex.test(row[label]) && tries < 10) {
                        row[label] += getRandomItem(['a','b','c','1','2','3']);
                        tries++;
                    }
                }
            }*/
		});
		
		generatedData.push(row);
	}
	
	renderPreview();
	downloadBtn.disabled = false;
	copyDataBtn.disabled = false;
}

// Helper functions
function getRandomItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomNumber(length) {
	let num = '';
	for (let i = 0; i < length; i++) {
		num += Math.floor(Math.random() * 10);
	}
	return num;
}

function generateRandomDate() {
	const now = new Date();
	const past = new Date(now.getFullYear() - 30, now.getMonth(), now.getDate());
	const randomDate = new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));

	let daten = `${randomDate.getFullYear()}-${(randomDate.getMonth() + 1).toString().padStart(2,0)}-${(randomDate.getDate()).toString().padStart(2,0)}`;
	return daten;
	// return randomDate.toISOString().split('T')[0];
}

function renderPreview() {
	if (generatedData.length === 0) {
		previewContainer.innerHTML = '<div class="empty-state"><i class="fas fa-table"></i><p>No data to preview</p></div>';
		renderPagination();
		return;
	}
	
	const headers = Object.keys(generatedData[0]);
	let tableHTML = '<table class="preview-table"><thead><tr>';
	
	headers.forEach(header => {
		tableHTML += `<th>${header}</th>`;
	});
	
	tableHTML += '</tr></thead><tbody>';
	
	// Calculate pagination
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = Math.min(startIndex + rowsPerPage, generatedData.length);
	
	for (let i = startIndex; i < endIndex; i++) {
		const row = generatedData[i];
		tableHTML += '<tr>';
		headers.forEach(header => {
			tableHTML += `<td>${row[header]}</td>`;
		});
		tableHTML += '</tr>';
	}
	
	tableHTML += '</tbody></table>';
	
	previewContainer.innerHTML = tableHTML;
	renderPagination();
}

function renderPagination() {
	if (generatedData.length === 0) {
		previewContainer.innerHTML += '<div class="pagination"></div>';
		return;
	}
	
	const totalPages = Math.ceil(generatedData.length / rowsPerPage);
	let paginationHTML = '<div class="pagination">';
	
	// Previous button
	paginationHTML += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">«</button>`;
	
	// Page numbers
	for (let i = 1; i <= totalPages; i++) {
		paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
	}
	
	// Next button
	paginationHTML += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}">»</button>`;
	
	paginationHTML += '</div>';
	
	previewContainer.innerHTML += paginationHTML;
	
	// Add event listeners to pagination buttons
	document.querySelectorAll('.page-btn:not(.disabled)').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const page = parseInt(e.target.dataset.page);
			if (page >= 1 && page <= totalPages) {
				currentPage = page;
				renderPreview();
			}
		});
	});
}

function saveColumnsToStorage() {
	const presetName = prompt('Enter a name for this preset:');
	if (!presetName) return;
	
	const presets = JSON.parse(localStorage.getItem('hyperseedPresets') || '[]');
	presets.push({ name: presetName, columns: [...columns] });
	localStorage.setItem('hyperseedPresets', JSON.stringify(presets));
	alert('Preset saved successfully!');
}

function loadPresetsIntoModal() {
	const presets = JSON.parse(localStorage.getItem('hyperseedPresets') || '[]');
	if (presets.length === 0) {
		presetsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No presets saved yet</p>';
		return;
	}
	
	let html = '';
	presets.forEach((preset, index) => {
		html += `
			<div class="preset-item">
				<span>${preset.name}</span>
				<div>
					<button class="btn apply-preset" data-index="${index}" style="padding: 5px 10px; margin-right: 8px;">
						<i class="fas fa-check"></i> Apply
					</button>
					<button class="btn delete-preset" data-index="${index}" style="padding: 5px 10px; background: var(--error);">
						<i class="fas fa-trash"></i>
					</button>
				</div>
			</div>
		`;
	});
	presetsList.innerHTML = html;
	
	// Add event listeners
	document.querySelectorAll('.apply-preset').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const index = parseInt(e.target.closest('.apply-preset').dataset.index);
			columns = [...presets[index].columns];
			renderColumns();
			presetsModal.classList.remove('active');
		});
	});
	
	document.querySelectorAll('.delete-preset').forEach(btn => {
		btn.addEventListener('click', (e) => {
			if (!confirm('Delete this preset?')) return;
			const index = parseInt(e.target.closest('.delete-preset').dataset.index);
			presets.splice(index, 1);
			localStorage.setItem('hyperseedPresets', JSON.stringify(presets));
			loadPresetsIntoModal();
		});
	});
}

function openPresetsModal() {
	loadPresetsIntoModal();
	presetsModal.classList.add('active');
}

// Toolbar event listeners
clearBtn.addEventListener('click', () => {
	if (confirm('Clear all generated data and columns?')) {
		columns = [];
		generatedData = [];
		currentPage = 1;
		renderColumns();
		renderPreview();
		downloadBtn.disabled = true;
	}
});

saveBtn.addEventListener('click', saveColumnsToStorage);
viewAllBtn.addEventListener('click', openPresetsModal);
closeModalBtn.addEventListener('click', () => presetsModal.classList.remove('active'));
presetsModal.addEventListener('click', (e) => {
	if (e.target === presetsModal) presetsModal.classList.remove('active');
});

// Download seeded data
function downloadData() {
	if (generatedData.length === 0) return;
	
	let content, type, filename;
	if (outputFormat.value === 'json') {
		content = JSON.stringify(generatedData, null, 2);
		type = 'application/json';
		filename = 'generated_data.json';
	} else {
		const headers = Object.keys(generatedData[0]);
		content = headers.join(',') + '\n';
		generatedData.forEach(row => {
			const values = headers.map(header => {
				let value = row[header] || '';
				if (value.toString().includes(',') || value.toString().includes('"')) {
					value = `"${value.toString().replace(/"/g, '""')}"`;
				}
				return value;
			});
			content += values.join(',') + '\n';
		});
		type = 'text/csv';
		filename = 'generated_data.csv';
	}
	
	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
}

function copyData() {
	if (generatedData.length === 0) return;
	const content = outputFormat.value === 'json' 
		? JSON.stringify(generatedData, null, 2)
		: generatedData.map(row => Object.values(row).join(',')).join('\n');
	navigator.clipboard.writeText(content).then(() => {
		copyDataBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
		setTimeout(() => {
			copyDataBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
		}, 2000);
	});
}


// ----------------------------------------------------------------------------------------------------------
// S T E R O I D S - update

const exportSchemaBtn = document.getElementById('exportSchemaBtn');
const importSchemaBtn = document.getElementById('importSchemaBtn');
const importSchemaInput = document.getElementById('importSchemaInput');

exportSchemaBtn.addEventListener('click', () => {
	if (columns.length === 0) return alert('No columns to export!');
	const schema = { columns, numRows: numRowsInput.value };
	const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'hyperseed-schema.json';
	a.click();
});

importSchemaBtn.addEventListener('click', () => importSchemaInput.click());
importSchemaInput.addEventListener('change', (e) => {
	if (!e.target.files[0]) return;
	const reader = new FileReader();
	reader.onload = (ev) => {
		try {
			const schema = JSON.parse(ev.target.result);
			columns = schema.columns;
			numRowsInput.value = schema.numRows || 10;
			renderColumns();
			alert('Schema imported successfully!');
		} catch (err) {
			alert('Invalid schema file!');
		}
	};
	reader.readAsText(e.target.files[0]);
});

const outputFormat = document.getElementById('outputFormat');
const copyDataBtn = document.getElementById('copyDataBtn');

// DB schema export -------------------------------------------------------------------------------------
const dbType = document.getElementById('dbType');
const generateSchemaBtn = document.getElementById('generateSchemaBtn');
const schemaOutput = document.getElementById('schemaOutput');

function generateSchema() {
    if (columns.length === 0) return schemaOutput.textContent = 'Add columns first';
    
    const tableName = 'mock_data';
    let output = '';
    
    if (dbType.value === 'prisma') {
        output = `model ${tableName.charAt(0).toUpperCase() + tableName.slice(1)} {\n`;
        columns.forEach(col => {
            const type = col.type === 'number' || col.type === 'bool' ? 'Int' : 
                        col.type === 'date' ? 'DateTime' : 'String';
            output += `  ${col.label.replace(/[^a-zA-Z0-9]/g, '_')} ${type}\n`;
        });
        output += '}';
    } else {
        const types = {
            postgres: { string: 'VARCHAR(255)', number: 'INTEGER', bool: 'BOOLEAN', date: 'DATE' },
            mysql: { string: 'VARCHAR(255)', number: 'INT', bool: 'TINYINT(1)', date: 'DATE' },
            sqlite: { string: 'TEXT', number: 'INTEGER', bool: 'BOOLEAN', date: 'TEXT' }
        }[dbType.value];
        
        output = `CREATE TABLE ${tableName} (\n  id SERIAL PRIMARY KEY,\n`;
        output += columns.map(col => {
            const baseType = col.type === 'number' ? 'number' : 
                           col.type === 'bool' ? 'bool' : 
                           col.type === 'date' ? 'date' : 'string';
            return `  ${col.label.replace(/[^a-zA-Z0-9]/g, '_')} ${types[baseType]}`;
        }).join(',\n') + '\n);';
    }
    
    schemaOutput.textContent = output;
}

generateSchemaBtn.addEventListener('click', generateSchema);

// DB schema rules ---------------------------------------------------------------------------------------
const ruleModal = document.getElementById('ruleModal');
const ruleMin = document.getElementById('ruleMin');
const ruleMax = document.getElementById('ruleMax');
const ruleRegex = document.getElementById('ruleRegex');
const applyRuleBtn = document.getElementById('applyRuleBtn');
let currentRuleIndex = -1;

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('rule-btn')) {
        currentRuleIndex = parseInt(e.target.dataset.index);
        const col = columns[currentRuleIndex];
        ruleMin.value = col.min || '';
        ruleMax.value = col.max || '';
        ruleRegex.value = col.regex || '';
        ruleModal.classList.add('active');
    }
});

applyRuleBtn.addEventListener('click', () => {
    if (currentRuleIndex >= 0) {
        columns[currentRuleIndex].min = ruleMin.value || undefined;
        columns[currentRuleIndex].max = ruleMax.value || undefined;
        columns[currentRuleIndex].regex = ruleRegex.value || undefined;
    }
    ruleModal.classList.remove('active');
});

document.querySelector('#ruleModal .close-modal').addEventListener('click', () => 
    ruleModal.classList.remove('active')
);

// hotkeys -----------------------------------------------------------------------------------------------------------
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'g') {
            e.preventDefault();
            generateData();
        } else if (e.key === 's') {
            e.preventDefault();
            saveColumnsToStorage();
        } else if (e.key === 'd') {
            e.preventDefault();
            downloadData();
        }
    }
});

// theme toggle --------------------------------------------------------------------------------------------------------
const themeToggle = document.getElementById('themeToggle');
const isDark = localStorage.getItem('hyperseedTheme') !== 'light';
document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'moon' : 'sun'}"></i>`;

themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('hyperseedTheme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
});

// Event listeners
generateBtn.addEventListener('click', generateData);
downloadBtn.addEventListener('click', downloadData);
copyDataBtn.addEventListener('click', copyData);

// Initialize
renderColumns();