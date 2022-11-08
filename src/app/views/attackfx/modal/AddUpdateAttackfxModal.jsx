import {
    Box,
    Button,
    Icon,
    Tooltip,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Span } from 'app/components/Typography'
import React, { useEffect, useState } from 'react'
import {
    doAttackFxAction,
    doAttackFxActionReset,
    getAttackFxById,
} from 'app/redux/actions/AttackFxAction'

export default function AddUpdateAttackfxModal(props) {
    const {
        showModal,
        onClose,
        modalData,
        modalMode,
        attackFxCategoriesResponse,
        scriptListResponse,
    } = props
    const [formData, setFormData] = useState({})
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const loading = useSelector((state) => state.scriptReducer.loading)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    useEffect(() => {
        if (modalData && modalData.id && modalMode === 'EDIT') {
            setFormData(modalData)
        }
    }, [modalData])
    useEffect(() => {
        // reset form with user data
        reset(formData)
    }, [formData])

    const onSubmit = (data) => {
        if (!data) {
            return false
        }
        const attackData = new FormData()
        console.log(formData)
        if (formData.id) {
            attackData.append('id', formData.id)
        }
        attackData.append('code', data.code)
        attackData.append('name', data.name)
        attackData.append('category', data.category)
        attackData.append('scriptId', data.scriptId)
        attackData.append('remedyScriptId', data.remedyScriptId)
        attackData.append('status', data.status)
        dispatch(doAttackFxActionReset())
        dispatch(
            doAttackFxAction(attackData, formData, formData.id ? 'put' : 'post')
        )
    }
    const selectFile = (event) => {
        setSelectedFiles(event.target.files)
    }
    const getFileDetails = (selectedFile) => {
        return (
            <div>
                <h5>File Details:</h5>
                <p>File Name: {selectedFile.name}</p>
                <p>File Type: {selectedFile.type}</p>
            </div>
        )
    }
    return (
        <Box>
            <Dialog
                open={showModal}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {modalMode === 'EDIT'
                        ? 'Update Technique'
                        : 'New Technique'}
                    <Tooltip title="Delete Agent">
                        <IconButton
                            style={{
                                position: 'absolute',
                                right: '0',
                                top: 'o',
                            }}
                            onClick={onClose}
                        >
                            <Icon color="error">cancel_circle</Icon>
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <b>Add or update new Technique</b>
                    </DialogContentText>
                    <div style={{ width: '500px' }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box mt={2} mb={2}></Box>
                            <Box mt={2} mb={2}></Box>
                            {/* <div className="mb-3 row">
                                <label
                                    htmlFor="btn-upload"
                                    className="col-sm-4 col-form-label"
                                >
                                    <input
                                        id="btn-upload"
                                        name="file"
                                        {...register('file')}
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={selectFile}
                                    />
                                    <Button
                                        className="btn-choose"
                                        variant="outlined"
                                        component="span"
                                    >
                                        Choose Files
                                    </Button>
                                </label>
                                <div className="col-sm-8">
                                    <div className="file-name">
                                        {selectedFiles &&
                                        selectedFiles.length > 0
                                            ? getFileDetails(selectedFiles[0])
                                            : null}
                                    </div>
                                </div>
                            </div> */}
                            <div className="mb-3 row">
                                <label
                                    htmlFor="code"
                                    className="col-sm-4 form-label"
                                >
                                    Code
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="code"
                                        {...register('code', {
                                            required: true,
                                            min: 2,
                                            maxLength: 100,
                                        })}
                                        aria-invalid={
                                            errors['code'] ? 'true' : 'false'
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="name"
                                    className="col-sm-4 form-label"
                                >
                                    Name
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name"
                                        {...register('name', {
                                            required: true,
                                            min: 2,
                                            maxLength: 100,
                                        })}
                                        aria-invalid={
                                            errors['name'] ? 'true' : 'false'
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="category"
                                    className="col-sm-4 form-label"
                                >
                                    Category
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        {...register('category', {
                                            required: true,
                                        })}
                                        className="form-select"
                                        aria-invalid={
                                            errors['category']
                                                ? 'true'
                                                : 'false'
                                        }
                                    >
                                        <option value="">All</option>
                                        {attackFxCategoriesResponse &&
                                        attackFxCategoriesResponse.data &&
                                        attackFxCategoriesResponse.data.length >
                                            0
                                            ? attackFxCategoriesResponse.data.map(
                                                  (data, index) => {
                                                      return (
                                                          <option
                                                              key={"cat"+data.key}
                                                              value={data.key}
                                                          >
                                                              {data.value}
                                                          </option>
                                                      )
                                                  }
                                              )
                                            : ''}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="scriptId"
                                    className="col-sm-4 form-label"
                                >
                                    Script
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        {...register('scriptId', {
                                            required: true,
                                        })}
                                        className="form-select"
                                        aria-invalid={
                                            errors['scriptId']
                                                ? 'true'
                                                : 'false'
                                        }
                                    >
                                        <option value="">Select</option>
                                        {scriptListResponse &&
                                        scriptListResponse.data &&
                                        scriptListResponse.data.length > 0
                                            ? scriptListResponse.data.map(
                                                  (data, index) => {
                                                      return (
                                                          <option
                                                              key={"scr"+data.id}
                                                              value={data.id}
                                                          >
                                                              {data.name}
                                                          </option>
                                                      )
                                                  }
                                              )
                                            : ''}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="scriptType"
                                    className="col-sm-4 form-label"
                                >
                                    Remedy Script
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        {...register('remedyScriptId', {
                                            required: true,
                                        })}
                                        className="form-select"
                                        aria-invalid={
                                            errors['remedyScriptId']
                                                ? 'true'
                                                : 'false'
                                        }
                                    >
                                        <option value="">Select</option>
                                        {scriptListResponse &&
                                        scriptListResponse.data &&
                                        scriptListResponse.data.length > 0
                                            ? scriptListResponse.data.map(
                                                  (data, index) => {
                                                      return (
                                                          <option
                                                              key={"rmscr"+data.id}
                                                              value={data.id}
                                                          >
                                                              {data.name}
                                                          </option>
                                                      )
                                                  }
                                              )
                                            : ''}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="status"
                                    className="col-sm-4 form-label"
                                >
                                    Sttus
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        {...register('status', {
                                            required: true,
                                        })}
                                        className="form-select"
                                        aria-invalid={
                                            errors['status'] ? 'true' : 'false'
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    gap: '1rem',
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    <Span
                                        sx={{
                                            pl: 1,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Submit
                                    </Span>
                                </Button>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={() => reset()}
                                    color="secondary"
                                >
                                    <Span
                                        sx={{
                                            pl: 1,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Reset
                                    </Span>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    type="button"
                                    onClick={onClose}
                                >
                                    <Span
                                        sx={{
                                            pl: 1,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Cancel
                                    </Span>
                                </Button>
                            </div>
                        </form>

                        {loading ? (
                            <div className="hover-custom ">
                                <CircularProgress className="progress" />{' '}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
