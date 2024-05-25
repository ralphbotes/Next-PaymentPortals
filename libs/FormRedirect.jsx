export default async function FormRedirect(a_data) {
    // Create a hidden form element
    const form = document.createElement('form');
    form.style.display = 'none'; // Hide the form

    // Set form attributes
    form.method = 'POST';
    form.action = a_data["submit_url"];

    // Add form fields
    for (const item of a_data["form_list"]) {
        const requestIdInput = document.createElement('input');
        requestIdInput.type = 'hidden';
        requestIdInput.name = item["key"];
        requestIdInput.value = item["value"];
        form.appendChild(requestIdInput);   
    }

    // Append the form to the document body
    document.body.appendChild(form);

    // Submit the form
    form.submit();
}