import api from "./apiClient";

class VariantService {
  async create(data: any) {
    const formData = new FormData();
    formData.append("sku", data.sku);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("productId", data.productId); // Required for creation

    if (data.image instanceof File) formData.append("image", data.image);
    if (data.attributes)
      formData.append("attributes", JSON.stringify(data.attributes));

    const response = await api.post(`/admin/variants`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  // Update Existing Variant
  async update(id: string, data: any) {
    const formData = new FormData();
    if (data.sku) formData.append("sku", data.sku);
    if (data.price !== undefined)
      formData.append("price", data.price.toString());
    if (data.stock !== undefined)
      formData.append("stock", data.stock.toString());
    if (data.image instanceof File) formData.append("image", data.image);
    if (data.attributes)
      formData.append("attributes", JSON.stringify(data.attributes));

    const response = await api.put(`/admin/variants/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async delete(id: string) {
    return (await api.delete(`/admin/variants/${id}`)).data;
  }
}

export const variantService = new VariantService();
