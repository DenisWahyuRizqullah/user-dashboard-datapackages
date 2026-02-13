import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, Space, Popconfirm, message } from "antd";
import TopNav from "../components/TopNav";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../services/customerService";
import "./Customer.css";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getCustomers();
      setCustomers(response.data || []);
    } catch {
      message.error("Gagal mengambil data customer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingCustomer(null);
    form.resetFields();
    setModalVisible(true);
  };

  const openEditModal = (record) => {
    setEditingCustomer(record);
    form.setFieldsValue({
      name: record.name,
      phone: record.phone,
      email: record.email,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      message.success("Customer berhasil dihapus");
      fetchData();
    } catch {
      message.error("Gagal menghapus customer");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setModalLoading(true);

      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, values);
        message.success("Customer berhasil diperbarui");
      } else {
        await createCustomer(values);
        message.success("Customer baru berhasil ditambahkan");
      }

      setModalVisible(false);
      fetchData();
    } catch (error) {
      if (error?.errorFields) {
        return;
      }
      message.error("Gagal menyimpan data customer");
    } finally {
      setModalLoading(false);
    }
  };

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "No. Telepon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Aksi",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Hapus customer"
            description="Apakah Anda yakin ingin menghapus customer ini?"
            okText="Ya"
            cancelText="Batal"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="customer-page">
      <TopNav />

      <div className="customer-content">
        <div className="customer-header">
          <div>
            <h1>Customer</h1>
            <p>Kelola data customer (lihat, tambah, ubah, dan hapus).</p>
          </div>
          <Button type="primary" className="add-customer-button" onClick={openCreateModal}>
            Tambah Customer
          </Button>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={customers}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>

      <Modal
        title={editingCustomer ? "Edit Customer" : "Tambah Customer"}
        open={modalVisible}
        confirmLoading={modalLoading}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText="Simpan"
        cancelText="Batal"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="Nama"
            name="name"
            rules={[{ required: true, message: "Nama wajib diisi" }]}
          >
            <Input placeholder="Masukkan nama customer" />
          </Form.Item>

          <Form.Item
            label="No. Telepon"
            name="phone"
            rules={[{ required: true, message: "No. telepon wajib diisi" }]}
          >
            <Input placeholder="Masukkan no. telepon" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email wajib diisi" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input placeholder="Masukkan email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Customer;

